import classes from "./Notification.module.scss";

const Notification = (props) => {
  const cssClasses = classes.notification;

  return (
    <section className={cssClasses}>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
