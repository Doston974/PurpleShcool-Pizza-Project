import Button from "../../components/button/Button";
import styles from "./Error.module.css"
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['error_div']}>
      <div className={styles['in_error']}>
        <span>Oops !</span>
        <p>nimadur xato ketti.</p>
        <Button className={styles['btn_navigate']} onClick={() => navigate(-1)}>
          ortga
        </Button>
      </div>
      <img
        src="https://createcostumes.com/wp-content/uploads/2019/08/InsideOut_Sadness_700x700.jpg"
        alt="error img"
        width={500}
        height={500}
      />
    </div>
  )
}

export default Error