import notFoundImg from "../../../assets/404.png";
import { Error } from "../../../components/Error";
import styles from "./styles.module.scss";

export const NotFoundPage = ({
  title = "Not Found",
  message = "This page does not exist",
}: {
  title?: string;
  message?: string;
}) => (
  <>
    <Error title={title} message={message} />
    <img src={notFoundImg} alt="" className={styles.img} width="600" height="400" />
  </>
);
