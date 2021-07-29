import Login from "./popup.login";
import StudentDashboard from "./popup.studentDashboard";
import "./styles/popup.css";

import defAvatar from "../../asset/pngegg.png";

type PopupProps = {
  online: boolean;
  handleSubmit: (e: any) => void;
};

const Popup = ({ online, handleSubmit }: PopupProps) => {
  return (
    <div className="popupMain">
      {!online ? (
        <Login handleSubmit={handleSubmit} />
      ) : (
        <StudentDashboard avatar={defAvatar} firstName="Oner" />
      )}
    </div>
  );
};

export default Popup;
