type IconProps = {
  type: "dark" | "light";
};

export const ProdutoIcon: React.FC<IconProps> = ({ type }) => {
  const filterStyle: React.CSSProperties = {
    filter: type === "dark" ? "brightness(0) saturate(100%)" : "brightness(1)",
  };

  return (
    <div style={filterStyle}>
      <svg
        width="45"
        height="39"
        viewBox="0 0 45 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="45" height="39" fill="url(#pattern0_196_129)" />
        <defs>
          <pattern
            id="pattern0_196_129"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0_196_129"
              transform="matrix(0.00962963 0 0 0.0111111 0.0666667 0)"
            />
          </pattern>
          <image
            id="image0_196_129"
            width="90"
            height="90"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHElEQVR4nO3cMU4bURSF4VdBG6UCByUKtLAzkhIoXbKEONlPEJVZARIoG4hcmeagkWakEcL2hMw9c5n5v9aSfd/vq+fCsksBAADAKyTNJV2/9hj6jdwgtiFyg9iGyA1iGyI3iG2IPL3Ykj5IupK0lLTSZg+SjnuM3JjveM7j+rU3WdWzX1ZnKRlJOpN03yHGQ1DkvmI3qrOcloSb/Nhh+EdJJ4GRO10jkr50XIo/kj6WLCQtEmxy1Gb/KBnU27FOsskRm/0k6WsZmqRfSSP3GftnSbzNi47PMVe86/+8Aofd6i3b3GkweSJ3ji3p85bFGWardwy1SBb5X2Ln2urqHU41UJIFGu8wAdJs9Vi3OdUipRhiCls99m1Os1B10FFvc5etLtE2vPDkFEJ7ENqE0CaENiG0yXsNvZZ0IWnW45yz+kvWXV9KvElfc247QITLwHmr2L2Lmrc9eITDwHkPIgaOmrc9eIRZ4LyfIgaOmrc9+Hu7Oq4iBo6atz14hHV9l/Jh2DoARGgbQpsQ2oTQJoQ2IbQJoU0IbUJoE0KbENqE0CaENiG0CaFNCG1CaBNCmxDahNAmhDYhtAmhTQhtQmgTQpsQ2oTQJoQ2IbQJoUIPaLQ2/5zdCr+OkLfDn3KBG4cob8PfcoEzh2h9yXdabqWkvbCQ9exjyYae1n9btES+cVmf6vuq5F/QK4k/a6uC9smAwAAAAAAlNyeAd2BIOyVfYWxAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
    </div>
  );
};
