import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const StartInterview: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>("Intermediate");
  const [duration, setDuration] = useState<number>(30);
  const [mediaConsent, setMediaConsent] = useState<boolean>(true);
  const [mediaMode, setMediaMode] = useState<"media" | "text">("media");
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const typeOptions: { key: string; label: string }[] = [
    { key: 'technical', label: 'Technical' },
    { key: 'behavioral', label: 'Behavioral' },
    { key: 'hr', label: 'HR' },
    { key: 'government', label: 'Government Service' },
    { key: 'placement', label: 'Placement' },
  ];

  const typeDescriptions: Record<string, string> = {
    technical: 'Practice coding, algorithms, data structures, and timed problem-solving tasks.',
    behavioral: 'Practice situational answers focusing on communication, teamwork, and leadership.',
    hr: 'Questions about HR, culture fit, policies, and behavioural fit for organisations.',
    government: 'Prepare for government interviews: ethics, current affairs, and policy discussions.',
    placement: 'Corporate job and internship practice covering HR and technical interview rounds.',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="w-full max-w-3xl bg-card p-6 rounded-lg shadow">
        {/* Header inside the box with back button and logo */}
        <div className="relative text-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-0"
            onClick={() => {
              if (step === 0) {
                navigate('/dashboard');
              } else {
                setStep((s) => Math.max(0, s - 1));
              }
            }}
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </Button>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-foreground">MockRank</span>
          </div>
        </div>

        {/* Thin line-like box under header (appears on all steps) */}
        <div className="w-full flex justify-center mb-4">
          <div className="w-48 h-1 bg-border rounded-full" />
        </div>

        <h2 className="text-xl font-semibold mb-4">Start Mock Interview</h2>

        {/* Progress */}
        <div className="mb-6">
          <div className="text-sm text-muted-foreground">Step {step + 1} of 5</div>
          <div className="h-2 w-full bg-muted/20 rounded mt-2">
            <div className={`h-2 bg-primary rounded`} style={{ width: `${((step + 1) / 5) * 100}%` }} />
          </div>
        </div>

        {/* Step content */}
        {step === 0 && (
          <div>
            <h3 className="font-medium mb-2">Choose Interview Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {typeOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedType(opt.key)}
                  className={`p-4 rounded border ${selectedType===opt.key ? 'border-primary bg-primary/10' : 'border-border'} text-left`}
                >
                  <div className="font-medium">{opt.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{typeDescriptions[opt.key]}</div>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <button disabled={!selectedType} onClick={next} className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50">Next</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 className="font-medium mb-2">Difficulty & Duration</h3>
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm">Difficulty:</label>
              <div className="space-x-2">
                {['Beginner','Intermediate','Advanced'].map((d) => (
                  <button key={d} onClick={() => setDifficulty(d)} className={`px-3 py-1 rounded ${difficulty===d? 'bg-primary text-white' : 'bg-muted/10'}`}>{d}</button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm block mb-2">Duration (minutes)</label>
              <div className="space-x-2">
                {[15,30,45,60].map((m) => (
                  <button key={m} onClick={() => setDuration(m)} className={`px-3 py-1 rounded ${duration===m ? 'bg-primary text-white' : 'bg-muted/10'}`}>{m}</button>
                ))}
                <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value) || 15)} className="w-20 ml-3 p-1 border rounded bg-background" />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="px-3 py-1 rounded border">Back</button>
              <button onClick={next} className="px-4 py-2 bg-primary text-white rounded">Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-medium mb-2">Mic & Camera Settings</h3>
            <div className="mb-3">
              <label className="text-sm block mb-1">Media Mode</label>
              <div className="space-x-2">
                <button onClick={() => setMediaMode('media')} className={`px-3 py-1 rounded ${mediaMode==='media'? 'bg-primary text-white':'bg-muted/10'}`}>Use Mic/Camera</button>
                <button onClick={() => setMediaMode('text')} className={`px-3 py-1 rounded ${mediaMode==='text'? 'bg-primary text-white':'bg-muted/10'}`}>Text-only</button>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm mb-2">Microphone Test</div>
              <div className="flex items-center gap-2">
                <div className="w-48 h-8 bg-muted/10 rounded flex items-center justify-center">Mic level meter (test)</div>
                <button className="px-3 py-1 border rounded">Record Test</button>
                <button className="px-3 py-1 border rounded">Play</button>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm mb-2">Camera Preview</div>
              <div className="w-48 h-32 bg-muted/10 rounded flex items-center justify-center">Camera preview</div>
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="px-3 py-1 rounded border">Back</button>
              <button onClick={() => { setMediaConsent(true); next(); }} className="px-4 py-2 bg-primary text-white rounded">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-medium mb-2">Instructions & Scoring</h3>
            <div className="mb-3 text-sm text-muted-foreground">Follow these before you start:</div>
            <ul className="list-disc ml-5 mb-3">
              <li>State your assumptions before you start.</li>
              <li>Think aloud while solving problems.</li>
              <li>For coding: write tests and explain time/space complexity.</li>
              <li>For behavioral: use STAR format (Situation, Task, Action, Result).</li>
            </ul>

            <div className="mb-3">
              <div className="font-medium">Scoring Rubric</div>
              <ul className="ml-5 list-disc text-sm text-muted-foreground">
                <li>Problem Understanding</li>
                <li>Approach & Design</li>
                <li>Communication & Clarity</li>
                <li>Correctness & Tests</li>
                <li>Efficiency & Optimization</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="px-3 py-1 rounded border">Back</button>
              <button onClick={next} className="px-4 py-2 bg-primary text-white rounded">Next (Review)</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="font-medium mb-2">Summary</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 border rounded">Type: <strong>{selectedType || '—'}</strong></div>
              <div className="p-3 border rounded">Difficulty: <strong>{difficulty}</strong></div>
              <div className="p-3 border rounded">Duration: <strong>{duration} min</strong></div>
              <div className="p-3 border rounded">Media: <strong>{mediaMode === 'media' ? 'Mic/Camera' : 'Text-only'}</strong></div>
            </div>

            <div className="flex gap-3">
              <button onClick={back} className="px-3 py-1 rounded border">Edit</button>
              <button
                onClick={() => navigate('/interview', { state: { selectedType, difficulty, duration, mediaMode } })}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Start Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
