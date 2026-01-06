const adminAnalyticsStyles = {
    container: {
      padding: "20px",
    },
  
    title: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#0f172a",
      marginBottom: "6px",
    },
  
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
  
    card: {
      background: "#ffffff",
      borderRadius: "14px",
      padding: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#334155",
      marginBottom: "10px",
    },
  
    cardValue: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#0f172a",
    },
  
    loading: {
      fontSize: "16px",
      color: "#475569",
      marginTop: "20px",
    },
  
    error: {
      fontSize: "16px",
      color: "#dc2626",
      marginTop: "20px",
    },

    downloadBtn: {
      background: "#0ea5e9",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };
  
  export default adminAnalyticsStyles;  