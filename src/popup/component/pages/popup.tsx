import Login from "./popup.login";
import StudentDashboard from "./popup.studentDashboard";
import "./styles/popup.css";

import defAvatar from "../../asset/pngegg.png";

type PopupProps = {
  online: boolean;
};

const Popup = ({ online }: PopupProps) => {
  return (
    <div className="popupMain">
      {!online ? (
        <Login />
      ) : (
        <StudentDashboard avatar={defAvatar} firstName="Oneristan" />
      )}
    </div>
  );
};

export default Popup;
