export default function ImagePopup(props) {
  const { name, link } = props.card;
  return (
    <div>
      <img
        className="popup__image"
        src={link}
        id="image"
        alt="Imagen del popup"
      />
      <p className="popup__image-name" id="imageName">
        {name}
      </p>
    </div>
  );
}
