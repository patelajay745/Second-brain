import "./App.css";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <div className="flex space-between p-8">
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

      <Card
        title="This is sample post "
        link="https://www.youtube.com/watch?v=gUdZyHiKfvU"
        type="Youtube"
      />
    </div>
  );
}

export default App;
