import "./App.css";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://harsh020-bvg.hf.space/api/v1/answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: question }),
        },
      );

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-300 -z-10 opacity-50"></div>
      <div className="flex flex-col items-center justify-center h-full z-20">
        <h1 className="text-7xl font-bold mb-10 text-gray-800">Saarthi</h1>
        <div className="flex w-full max-w-3xl px-4">
          <div className="relative h-full w-full mr-2">
            <div className="absolute inset-0 blur-sm bg-white rounded-lg -z-10"></div>
            <Input
              type="text"
              placeholder="Ask questions to your Saarthi"
              className="w-full px-4 py-4 mr-4 rounded-lg bg-transparent focus:outline-none focus:ring-0 focus:ring-0"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <Button
            // className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmit}
          >
            {loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin text-foreground m-auto text-white" />
            ) : (
              "Ask"
            )}
          </Button>
        </div>
        {answer && (
          <div className="relative mt-8 p-4 bg-white/70 rounded-lg overflow-y-auto max-h-48 w-[60vw]">
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
