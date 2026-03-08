import Button from "./Button";

type ServiceCardProps = {
  title: string;
  whoItsFor: string;
  includes: string[];
  priceStr?: string;
  durationStr?: string;
  ctaLink?: string;
};

export default function ServiceCard({
  title,
  whoItsFor,
  includes,
  priceStr = "₦50,000",
  durationStr = "45 mins",
  ctaLink = "/book"
}: ServiceCardProps) {
  return (
    <div
      className="glass-glow hover-lift"
      style={{
        padding: "2rem",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <h3 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", color: "var(--rc-text-main)" }}>
        {title}
      </h3>
      <p style={{ color: "var(--rc-text-light)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
        {whoItsFor}
      </p>

      <div style={{ flexGrow: 1, marginBottom: "1.5rem" }}>
        <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem", fontWeight: "600" }}>What&apos;s Included:</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {includes.map((item, index) => (
            <li key={index} style={{ display: "flex", gap: "0.5rem", fontSize: "0.9rem", color: "var(--rc-text-main)" }}>
              <span style={{ color: "var(--rc-primary)" }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        marginTop: "auto",
        borderTop: "1px solid var(--rc-border)",
        paddingTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--rc-primary-dark)" }}>{priceStr}</span>
          <span style={{ fontSize: "0.9rem", background: "var(--rc-primary-light)", color: "var(--rc-primary-dark)", padding: "0.3rem 0.8rem", borderRadius: "10px", fontWeight: "600" }}>
            {durationStr}
          </span>
        </div>
        
        <Button href={ctaLink} size="md" showIcon style={{ width: "100%" }}>
          Book Now
        </Button>
      </div>
    </div>
  );
}
