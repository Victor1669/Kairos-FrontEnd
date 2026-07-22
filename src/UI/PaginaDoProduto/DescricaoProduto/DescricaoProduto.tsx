import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useCartContext } from "@Cart/useCartContext";
import { useAuthContext } from "@Auth/useAuthContext";

import Miniatura from "@UI/Miniatura/Miniatura";

import Styles from "./DescricaoProduto.module.css";

import LockIcon from "@Assets/icons/lock.png";
import CartIcon from "@Assets/icons/cart.png";

import type { ProdutoType } from "@Products/ProdutoType";

export default function DescricaoProduto({
  produto,
}: {
  produto: ProdutoType;
}) {
  const { nome, description, size, color } = produto;
  const { adicionarProdutoAoCarrinho } = useCartContext();
  const { hasUserInfo } = useAuthContext();

  const navigateTo = useNavigate();

  function handleAdicionarAoCarrinho() {
    if (hasUserInfo) {
      adicionarProdutoAoCarrinho(produto);
    } else {
      navigateTo("/user/signup");
    }
  }

  return (
    <section className={Styles.DescricaoProduto}>
      <div className={Styles.Descricao}>
        <h1>{nome}</h1>
        <p>{description}</p>
      </div>

      <div className={Styles.Cores}>
        <p>Cores disponíveis</p>
        <ul>
          {color.map((c, index) => (
            <li
              style={{ backgroundColor: c, width: 30, height: 30 }}
              key={index}
            />
          ))}
        </ul>
      </div>

      <div className={Styles.Tamanhos}>
        <ul>
          {size.map((t, index) => (
            <li key={index}>
              <Miniatura label={t} />
            </li>
          ))}
        </ul>
      </div>

      <Button type="submit" variant="dark" onClick={handleAdicionarAoCarrinho}>
        <img src={CartIcon} />
        Adicionar ao carrinho
      </Button>

      <div className={Styles.Seguranca}>
        <img src={LockIcon} />
        <p>Compra segura e protegida.</p>
      </div>
    </section>
  );
}
