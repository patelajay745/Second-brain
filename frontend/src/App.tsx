import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <div className="flex mx-auto space-x-2">
      <Button
        variant="primary"
        text="Add Content"
        startIcon={<PlusIcon />}
      ></Button>

      <Button
        variant="secondary"
        text="Share brain"
        startIcon={<ShareIcon />}
      ></Button>
    </div>
  );
}

export default App;
