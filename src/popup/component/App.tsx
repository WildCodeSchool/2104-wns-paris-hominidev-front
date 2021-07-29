import { useState } from "react";
import Popup from "./pages/popup";
import PopupLayout from "./pages/popup.layout";

function App(): JSX.Element {
  const [online, setOnline] = useState(false);

  return (
    <PopupLayout>
      <Popup online={online}/>
    </PopupLayout>
  );
}
export default App;
