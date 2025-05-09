import React from "react";
import s from "./style.module.css";

function CssHeaderPosition({ props }: { props: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="bouton_container_bloc_css_carousel">
        <div className={s.bouton_container_bloc}>
          <div className={s.encart_bloc_name_title}>
            <h3
              style={{
                textDecoration: "underline",
              }}
            >
              Bloc en-tête
            </h3>
          </div>
        </div>
      </div>
      <div>{props}</div>
    </div>
  );
}

export default CssHeaderPosition;
