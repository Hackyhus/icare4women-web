const fs = require('fs');
const https = require('https');

const envFile = fs.readFileSync('.env.local', 'utf8');
const apiKeyMatch = envFile.match(/NEXT_PUBLIC_FIREBASE_API_KEY=(.*)/);
const projectIdMatch = envFile.match(/NEXT_PUBLIC_FIREBASE_PROJECT_ID=(.*)/);

if (!apiKeyMatch || !projectIdMatch) {
  console.error("Missing Firebase API Key or Project ID in .env.local");
  process.exit(1);
}

const API_KEY = apiKeyMatch[1].trim();
const PROJECT_ID = projectIdMatch[1].trim();
const email = process.argv[2] || 'admin@hackyhus.com';
const password = process.argv[3] || 'HackyhusAdmin2026!';

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log(`🚀 Creating admin for ${PROJECT_ID}...`);
  
  // 1. Sign up user
  const signupResponse = await request(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    'POST',
    { email, password, returnSecureToken: true }
  );

  let localId = signupResponse.localId;

  // If already exists, Sign In to get localId
  if (signupResponse.error && signupResponse.error.message === 'EMAIL_EXISTS') {
    console.log(`User ${email} exists, fetching UID...`);
    const signinResponse = await request(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      'POST',
      { email, password, returnSecureToken: true }
    );
    localId = signinResponse.localId;
  } else if (signupResponse.error) {
     console.error("Auth Error:", signupResponse.error.message);
     return;
  }

  console.log(`User UID: ${localId}. Writing Admin roles to Firestore...`);

  // 2. Write to Firestore 'users' collection
  const firestoreUrlUsers = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${localId}?updateMask.fieldPaths=role&updateMask.fieldPaths=email`;
  const usersPayload = {
     fields: { role: { stringValue: 'Admin' }, email: { stringValue: email } }
  };
  await request(firestoreUrlUsers, 'PATCH', usersPayload);

  // 3. Write to Firestore 'patients' collection (fallback for shared logic)
  const firestoreUrlPatients = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/patients/${localId}?updateMask.fieldPaths=role&updateMask.fieldPaths=email`;
  const patientsPayload = {
     fields: { role: { stringValue: 'Admin' }, email: { stringValue: email } }
  };
  await request(firestoreUrlPatients, 'PATCH', patientsPayload);

  console.log('✅ SUCCESS: Admin role injected into database!');
}

run();
