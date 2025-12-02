"use client";
import styles from "./PostStatusDistribution.module.css";

export default function PostStatusDistribution({ data = [] }) {
  const defaultData = [
    { name: "Agendadas", value: 0, color: "#5dd4c0" },
    { name: "Publicadas", value: 0, color: "#47c4ac" },
    { name: "Rascunhos", value: 0, color: "#84e7d2" },
  ];

  const chartData = data && data.length > 0 ? data.map((item, index) => ({
    ...item,
    color: ["#5dd4c0", "#47c4ac", "#84e7d2"][index] || "#5dd4c0"
  })) : defaultData;

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const maxValue = Math.max(...chartData.map(item => item.value), 1);

  return (
    <div className={styles.container}>
      {/* Header Minimalista */}
      <div className={styles.header}>
        <h3 className={styles.title}>Status</h3>
        <span className={styles.total}>{total}</span>
      </div>

      {/* Gráfico de Barras Verticais Minimalista */}
      <div className={styles.chartContainer}>
        {chartData.map((item, index) => {
          const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
          const barHeight = total > 0 ? (item.value / maxValue) * 100 : 0;

          return (
            <div 
              key={index} 
              className={styles.barColumn}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Barra Vertical */}
              <div className={styles.barTrack}>
                <div 
                  className={styles.barFill}
                  style={{ 
                    height: `${barHeight}%`,
                    background: item.color,
                  }}
                />
              </div>

              {/* Valor */}
              <span className={styles.value}>{item.value}</span>

              {/* Label */}
              <div 
                className={styles.dot}
                style={{ background: item.color }}
              />
              <span className={styles.label}>{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}