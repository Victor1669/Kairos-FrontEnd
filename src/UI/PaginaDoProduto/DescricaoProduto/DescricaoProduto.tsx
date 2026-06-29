import { useCartContext } from "@Cart/useCartContext";

import Miniatura from "@UI/Miniatura/Miniatura";

import Styles from "./DescricaoProduto.module.css";

import LockIcon from "@Assets/icons/lock.png";
import CartIcon from "@Assets/icons/cart.png";

import type { ProdutoType } from "@Cart/CarrinhoType";

export default function DescricaoProduto({
  produto,
}: {
  produto: ProdutoType;
}) {
  const { nome, descricao, tamanhos, cores } = produto;
  const { adicionarProdutoAoCarrinho } = useCartContext();

  function handleAdicionarAoCarrinho() {
    adicionarProdutoAoCarrinho(produto);
  }

  return (
    <section style={{ gridArea: "descricao" }}>
      <div className={Styles.DescricaoProduto}>
        <div className={Styles.Descricao}>
          <h1>{nome}</h1>
          <p>{descricao}</p>
        </div>

        <div className={Styles.Cores}>
          <p>Cores disponíveis</p>
          <ul>
            {cores.map((c, index) => (
              <li
                style={{ backgroundColor: c, width: 30, height: 30 }}
                key={index}
              />
            ))}
          </ul>
        </div>

        <div className={Styles.Tamanhos}>
          <ul>
            {tamanhos.map((t, index) => (
              <li key={index}>
                <Miniatura label={t} />
              </li>
            ))}
          </ul>
        </div>

        <button onClick={handleAdicionarAoCarrinho} className="default-button">
          <img src={CartIcon} />
          Adicionar ao carrinho
        </button>

        <div className={Styles.Seguranca}>
          <img src={LockIcon} />
          <p>Compra segura e protegida.</p>
        </div>
      </div>
    </section>
  );
}
