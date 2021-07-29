import { useState } from "react";
import Popup from "./pages/popup";
import PopupLayout from "./pages/popup.layout";

function App(): JSX.Element {
  const [online, setOnline] = useState(false);
  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      setOnline(true);
    }
  };
  return (
    <PopupLayout>
      <Popup online={online} handleSubmit={handleSubmit} />
    </PopupLayout>
  );
}
export default App;
