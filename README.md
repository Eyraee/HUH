<div align="center">

<pre>
 ██╗  ██╗ ██╗   ██╗ ██╗  ██╗ ██████╗ 
 ██║  ██║ ██║   ██║ ██║  ██║ ╚════██╗
 ███████║ ██║   ██║ ███████║  █████╔╝
 ██╔══██║ ██║   ██║ ██╔══██║  ██╔══╝ 
 ██║  ██║ ╚██████╔╝ ██║  ██║  ██║    
 ╚═╝  ╚═╝  ╚═════╝  ╚═╝  ╚═╝  ╚═╝    
                              ██╗    
                              ╚═╝    
</pre>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Press+Start+2P&weight=400&size=16&pause=1000&color=00FF00&background=000000&center=true&vCenter=true&width=600&lines=The+game+that+actively+insults+you.;Zero+backend.+Pure+chaos.;900+unhinged+questions.)](https://huh.eyrae.in)

**[ 🔴 PRESS START (PLAY LIVE) ](https://huh.eyrae.in)**

<br>

<img width="617" height="307" alt="Screenshot 2026-09-21 134926" src="https://github.com/user-attachments/assets/ca57ce3e-9ed8-4888-ac55-9fe9acb436d6" />


</div>

---

## 👾 THE LORE

Standard trivia apps are a snooze fest. Nobody cares about the capital of France or who invented the cotton gin. I spent 3 months building **HUH?** because I wanted a game that asks you how many sauce packets are rotting in your fridge, and then verbally destroys you when you guess wrong. 

Hosted by a fully animated, passive-aggressive entity named **Mr. U**, this game tracks your reaction time, knows if you're spamming the <kbd>Hint</kbd> button, and genuinely roots for your downfall.

---

## ⚙️ THE ENGINE (Zero Servers, Pure Spite)

This might look like a chaotic retro web game, but under the hood, it’s a heavily optimized, completely serverless Next.js application. I refused to pay for a backend, so I engineered around it:

<table>
  <tr>
    <td width="50%">
      <h3>🎹 Native Audio Synth</h3>
      No bulky <code>.mp3</code> files lagging the browser. Every single UI pop, error thud, and retro victory chime is synthesized mathematically on the fly using the native <b>Web Audio API</b>.
    </td>
    <td width="50%">
      <h3>💾 Local DB</h3>
      High scores, unlockable skins, and the 900-question memory state are handled through a hyper-optimized <code>localStorage</code> architecture. Instant loads. No server costs.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🗜️ Canvas Compression</h3>
      Uploading a custom PFP doesn't bloat your local storage. The engine routes the image through a hidden HTML5 canvas, auto-crops it, and compresses it into a tiny base64 JPEG string.
    </td>
    <td width="50%">
      <h3>🤖 Artificial "Soul"</h3>
      Mr. U isn't a static SVG. He's animated with <b>Framer Motion</b> and features over 150 lines of context-aware dialogue depending on your current gameplay "Vibe" setting.
    </td>
  </tr>
</table>

<br>

<div align="center">
  <h3>📸 Dynamic Neo-Brutalist Scorecards</h3>
  <p>I built a custom Canvas generator that composites your PFP, username, final score, and a personalized roast into a downloadable ID card directly in the browser.</p>
  <img width="1877" height="1017" alt="Screenshot 2026-09-21 133739" src="https://github.com/user-attachments/assets/b9faad75-1add-40ec-a496-fd169c9f978f" />

</div>

---

## 🕹️ BOOT SEQUENCE (Run it Locally)

Want to inspect the synthetic audio code or break the game entirely? Clone it down.

```bash
# 1. Jack into the mainframe
git clone [https://github.com/Eyraee/HUH.git](https://github.com/Eyraee/HUH.git)

# 2. Enter the directory
cd huh

# 3. Install the dependencies
npm install

# 4. Boot the dev server
npm run dev

```

> **Pro Tip:** To wipe your player memory and trigger the fresh "First Time Visitor" onboarding screen, open your DevTools console (`F12`) and run `localStorage.clear()`.

---

## 🧠 FEED THE MACHINE (Contributing)

The game currently houses **900** hand-written questions, shuffled via a mathematical Fisher-Yates algorithm. It cross-references your local storage so you never see the same question twice.

If you want to add to the chaos, submit a Pull Request. Add your questions to `data/questions.ts` using this exact schema:

```typescript
export interface Question {
  id: number; // Keep it unique
  question: string;
  type: "number" | "boolean" | "text";
  answer: string | number | boolean;
  unit?: string; // e.g., "tabs", "minutes"
  tolerance?: number; // How far off they can be for partial/full points
  fact: string; // The sarcastic truth revealed after they lock in
}

```

---

## 📜 LICENSE & CREDITS

**MIT License.** Clone it, fork it, learn from it.

Built with spite, Next.js, and zero sleep by **[Tushar Shah (Eyrae)](https://eyrae.in)**.

If you manage to pull an **S-Rank** against the machine, tag me on [LinkedIn](https://www.linkedin.com/in/eyrae/). Good luck.
