import closeIcon from "../../../../images/icons/close.png";
export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <div className="popup">
      <div className={title ? "popup__container" : "popup__container-image"}>
        <button className="popup__close-icon" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Icono cerrar ventana" />
        </button>
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
