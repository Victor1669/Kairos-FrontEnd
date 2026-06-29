export function formatarParaDinheiro(valor: number) {
  const valorPossuiCentavos = valor % 1 > 0;

  return `R$ ${valorPossuiCentavos ? valor : valor + ",00"}`;
}
