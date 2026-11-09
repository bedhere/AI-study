/**
 * Course structured data (English) — unified data source for the portal homepage
 * (home.html) and the Wiki learning page (learn.html).
 *
 * Structure: Part → Topic → Lesson
 * lesson.file maps to an .html under slides/
 * lesson.tag is used to display colored badges
 */
window.COURSE = {
  meta: {
    title: 'AI from Fundamentals to Mastery',
    subtitle: 'From LLM Fundamentals to AI Agent Harness',
    brand: 'Fangpian Academy',
    author: 'Fangpian',
    authorUrl: '',
    github: 'https://github.com/bedhere/AI-study',
  },
  parts: [
    /* Opening chapter: the first stop of the course — locate yourself, then learn how to
       learn. Sits before Part 0, so new visitors land here by default (learn.html takes
       FLAT[0]). Temporarily reuses the prologue flag, which renders the same INTRO badge
       as Part 0; a dedicated preface style follows once the Ask Alice branch lands. */
    {
      id: 'p-start',
      num: 'Start Here',
      title: 'Before You Begin',
      desc: 'Three opening lessons: locate yourself on the Dunning-Kruger curve, learn how to study so the knowledge actually sticks, and see why the fundamentals are worth your time — once they click, every later solution explains itself.',
      color: '#64748b',
      prologue: true,
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-intro',
          title: 'Orientation',
          desc: 'Figure out where we are and why foundations matter',
          lessons: [
            { file: 'roadmap.html', title: "Start with your goal at work", desc: "Fangpian is moving from an MCN business toward technology. Every colleague can find a starting point and bring AI into real work.", tag: 'Intro' },
            { file: '0-intro.html', title: "Where Are We? The Dunning-Kruger Effect", desc: "Dunning-Kruger Effect: Before the AI Product Manager Bootcamp officially begins, let's locate where you are on the learning curve.", tag: 'Intro' },
            { file: '0-how.html', title: "How to Learn So Knowledge Actually Sticks", desc: "This course has no shortage of content — what's missing is your 30-second pause to reflect.", tag: 'Intro' },
            { file: '0-why.html', title: "Why Do We Spend So Much Time on Fundamentals?", desc: "Sharpening the axe doesn't delay the woodcutting · A solid foundation is the prerequisite for real engineering", tag: 'Intro' },
          ],
        },
      ],
    },
    {
      id: 'p0',
      num: 'Part 0',
      title: 'For Those Meeting AI for the First Time',
      desc: 'No jargon, no math. Eight short interactive lessons that build the right instincts about AI: the amazing things it can do, why it bluffs with a straight face, how to talk to it, and what you can safely hand over. Friendly to complete beginners — the whole chapter is free, no login required.',
      color: '#0891b2',
      prologue: true,
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-zero-what',
          title: 'What Exactly Is AI',
          desc: 'First see what it can do, then see through how it works',
          lessons: [
            { file: 'zero-0.html', title: "Skip the Theory for Now — Look at the Amazing Things It Can Do", desc: "If you haven't really used AI yet, or you've only tried it as a \"Q&A machine\" a few times — this lesson starts with six real-life scenes of it at work. By the end, one thing will be clear: this isn't just another new piece of software. This is the first time in software history that things have flipped around.", tag: 'Interactive' },
            { file: 'zero-1.html', title: "What Exactly Is AI? It's Really Just Playing \"Finish the Sentence\"", desc: "Don't let the words \"artificial intelligence\" intimidate you. ChatGPT, DeepSeek, Doubao… whatever the name, what they do boils down to one thing: guessing the next word of your sentence. No background needed for this lesson — play two little games and it'll click.", tag: 'Interactive' },
            { file: 'zero-2.html', title: "It Isn't Searching the Web for Your Answer", desc: "The most common beginner misconception about AI: \"isn't it just a smarter search box?\" — Not at all. Last lesson you learned it's \"finishing sentences\"; this lesson shows the fundamental difference between it and a search engine, so you'll know when to use which.", tag: 'Concept' },
            { file: 'zero-3.html', title: "It Spouts Nonsense with a Straight Face", desc: "From the last two lessons you know: it finishes sentences, and it does so from \"digested memory\". Now comes the most important lesson of all — sounding right is not the same as being right. Each of the three AI answers below hides one fabricated sentence. Go ahead — catch it yourself.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-zero-talk',
          title: 'How to Talk to It',
          desc: 'Two speaking techniques you can use right away',
          lessons: [
            { file: 'zero-4.html', title: "Treat It Like a Brilliant New Colleague Who Knows Nothing About You", desc: "Why do other people get stunning results from AI while your questions land flat? Ninety percent of the gap isn't in the AI — it's in how you ask. This lesson gives you one mental model and one formula you can use right away.", tag: 'Interactive' },
            { file: 'zero-5.html', title: "The Universal Opener: \"Ask Me a Few Questions First, Then Start\"", desc: "Last lesson's formula is great, but you may have noticed a dead end: often, you don't know what to specify either. This lesson shares a little trick: hand that exact puzzle back to the AI — it takes just one sentence.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-zero-faq-usage',
          title: 'Using It Well',
          desc: 'One question per page: use it better, pick the right tools',
          lessons: [
            { file: 'zero-q-prompt.html', title: "How Do You Actually Write a Good Prompt?", desc: "The internet is full of \"god-tier prompt templates,\" often hundreds of words long. The skeleton that actually works has just three parts — everything else is icing on the cake.", tag: 'Interactive' },
            { file: 'zero-q-prompt-engineering.html', title: "Is \"Prompt Engineering\" Only for Engineers?", desc: "You may have heard of \"prompt engineer\" as a job title — maybe even the impressive salaries. How does a \"way of talking\" earn the word \"engineering\"?", tag: 'Interactive' },
            { file: 'zero-q-model-agent-app.html', title: "Models, Agents, AI Apps — How Do They Relate?", desc: "One day the news says \"Company X released a new model,\" the next it's \"the year of the Agent,\" and then it's a flood of AI apps — which word means what, exactly?", tag: 'Interactive' },
            { file: 'zero-q-agent.html', title: "What Makes Agents So Powerful? Why Everyone's Talking About Them", desc: "The previous page called an Agent \"the full car with wheels on.\" This page shows it actually driving — the same task, done by a chat AI versus an Agent.", tag: 'Interactive' },
            { file: 'zero-q-skill.html', title: "What Is This \"Skill\" Everyone's Talking About?", desc: "Seen phrases like \"installing skills into AI\" or \"the Skill ecosystem is exploding\"? It sounds fancy, but this might be the easiest new term in the AI world to understand — the little cheat notes you scribbled in the corner of your textbook as a kid are its entire working principle.", tag: 'Interactive' },
            { file: 'zero-q-vibe-coding.html', title: "What Is Vibe Coding? Can You Build Software Without Writing Code?", desc: "You keep seeing posts like \"I built an app with one sentence\" or \"I shipped a little tool with zero coding background.\" That practice has a name: Vibe Coding. Does it actually work? How far does it go? This page will give you a straight answer.", tag: 'Interactive' },
            { file: 'zero-q-china-models.html', title: "What Chinese AI Models Are Out There? How to Choose?", desc: "First, a fact that may surprise you: on global blind-test leaderboards, Chinese models stopped being \"the ones catching up\" a while ago — several rank among the world's best. The real question isn't \"which is strongest,\" but \"which fits your scenario.\"", tag: 'Interactive' },
            { file: 'zero-q-companies.html', title: "Beyond OpenAI, Which AI Companies Matter?", desc: "Too many names in the news to keep track of? The recurring main characters are actually just a handful. Start with a matching game: pair each \"company\" with its \"flagship product.\"", tag: 'Interactive' },
          ],
        },
        {
          id: 't-zero-faq-basics',
          title: 'Concept Primer',
          desc: 'One question per page: a zero-background take on the words in the news',
          lessons: [
            { file: 'zero-q-token.html', title: "What Is a Token? Why Does AI Charge by It?", desc: "The bill says \"billed by token,\" the news keeps talking about \"a million tokens\" — what even is a token? This page lets you slice a sentence open and see for yourself.", tag: 'Interactive' },
            { file: 'zero-q-context-window.html', title: "Why Does It \"Forget\" After a Long Chat?", desc: "Something you clearly said in turn 1, by turn 20 it answers as if it never heard. It's not broken, and it's not blowing you off — that sentence is just no longer in front of it.", tag: 'Interactive' },
            { file: 'zero-q-reasoning.html', title: "What Are \"Reasoning Models\" and \"Deep Thinking\"?", desc: "A lot of AI apps hide a Deep Thinking switch. Turn it on and the reply slows down, the bill goes up — so what are you actually buying?", tag: 'Interactive' },
            { file: 'zero-q-parameters.html', title: "Does More Parameters Mean Smarter?", desc: "Launch events toss around \"100 billion parameters\" and \"a trillion parameters\" like it's nothing — each number scarier than the last. What even is a \"parameter\"? And does a bigger number automatically mean smarter?", tag: 'Interactive' },
            { file: 'zero-q-multimodal.html', title: "Why Can't Some AIs \"See\" Pictures?", desc: "You've probably run into this: you send an AI a photo and it replies \"sorry, please describe it in words.\" You've also seen ones that can read an entire recipe out of a photo. Both are AI — what's the difference?", tag: 'Interactive' },
            { file: 'zero-q-finetune-vs-rag.html', title: "What Is Fine-Tuning? How Is It Different from \"Feeding It Docs\"?", desc: "Your boss says \"feed the company docs to the AI.\" A vendor says \"we'll fine-tune a custom model for you.\" They sound like the same thing — the quotes can differ by a few hundred times. This page uses two analogies — \"going back to class\" and \"an open-book exam\" — to help you do the math.", tag: 'Interactive' },
            { file: 'zero-q-knowledge-base.html', title: "What Is This \"Knowledge Base\" Every Company Is Building?", desc: "In meetings you keep hearing \"we need to build a knowledge base\" and \"hook up RAG\" — it sounds like a huge project. It's really just giving the AI a bookshelf it can look up anytime: the exam is open-book now, and it has to point you to the page it flipped to.", tag: 'Interactive' },
            { file: 'zero-q-acronyms.html', title: "GPT, LLM, AIGC… How Do You Tell These Acronyms Apart?", desc: "A single news sentence can cram in four or five acronyms — every one looks familiar, none of them you can explain. Don't panic. This page uses one matching game plus a relationship map to put each of them in its place.", tag: 'Interactive' },
            { file: 'zero-q-nvidia-gpu.html', title: "Why Is NVIDIA Worth So Much?", desc: "A \"graphics-card company\" ranking among the world's most valuable firms — a lot of people don't get it at first. You only need two pictures: a gold rush, and an arithmetic contest.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-zero-faq-myth',
          title: 'Debunking the Hype',
          desc: 'One question per page: puncture the hype and common myths',
          lessons: [
            { file: 'zero-q-train-or-prompt.html', title: "\"I Trained a Model\" — What Did They Actually Train?", desc: "Someone at a dinner party, glass in hand, says \"I trained a model recently.\" The exaggeration in that sentence can run from zero to ninety-nine percent. This page helps you hear what they actually did, and along the way pick up three follow-ups that can quiet the whole table.", tag: 'Interactive' },
            { file: 'zero-q-jargon-translator.html', title: "AI Jargon Translator", desc: "AI talking points at launch events, on WeChat Moments, and in press releases usually have plenty of water in them. This page takes the eight most common lines and translates each one into plain language, with a gold-content rating. When you're done you'll see: the jargon isn't deep — nobody just translated it for you.", tag: 'Interactive' },
            { file: 'zero-q-opensource-free.html', title: "Does an “Open-Source Model” Mean It's Free?", desc: "The news says a model has been \"open-sourced,\" and the comments cheer \"top-tier AI, free to use.\" Hold the celebration. In AI, \"open source\" and the free you have in mind are several layers apart. This page peels them one by one.", tag: 'Interactive' },
            { file: 'zero-q-benchmark.html', title: "Why Does the \"#1 on the Leaderboard\" Model Feel Worse in Real Use?", desc: "You see a headline that a new model \"dominates the leaderboard,\" switch over in a rush — and writing a weekly report still feels less smooth than before. You didn't use it wrong, and the board isn't fake. The test and what you need were never aligned.", tag: 'Interactive' },
            { file: 'zero-q-ai-learning.html', title: "The More We Chat, the Better It Knows Me — Is It Learning?", desc: "After using AI for a while, you may have felt this: it knows where you live, what you like to eat, and gets more thoughtful the more you chat — as if it's slowly getting to know you. Is it really learning and evolving? The answer is a bit of a surprise: it hasn't learned a single word.", tag: 'Interactive' },
            { file: 'zero-q-ai-detector.html', title: "When an AI Detector Says \"This Was Written by AI,\" Can You Trust It?", desc: "You submitted a paper and the school detector flagged it as \"AI-generated rate too high.\" A report you wrote carefully, and a colleague suspects a machine wrote it… How much trust does that score actually deserve? Don't rush to protest — play a short game, and you'll have your answer.", tag: 'Interactive' },
            { file: 'zero-q-prompt-course.html', title: "Are \"Secret Prompt Playbooks\" Worth Buying?", desc: "\"Exclusive universal templates, limited-time price\" \"Learn this and make 10,000+ a month with an AI side hustle\"… Seen ads like these? Before you pay, we'll take a typical flyer apart line by line and stamp each selling point.", tag: 'Interactive' },
            { file: 'zero-q-randomness.html', title: "Why Is the Answer Different Every Time?", desc: "Yesterday you asked it to name a milk-tea shop and got three artsy options. Today you ask the exact same thing, and the whole vibe has changed. Bad memory — or is it blowing you off? Neither. Click a few buttons and you can watch how each word actually arrives.", tag: 'Interactive' },
            { file: 'zero-q-ai-customer-service.html', title: "Why Is AI Customer Service So Dumb?", desc: "You may have wondered too: in the same era, chat AI is already as sharp as a reliable colleague, but you open the shopping app's support and the one on the other side is still playing dumb with a straight face. There's actually a reason. Read on and you'll see where the dumbness lives, and how to deal with it.", tag: 'Interactive' },
            { file: 'zero-q-siri-vs-chatgpt.html', title: "Are Siri and ChatGPT the Same Thing?", desc: "Both are called AI assistants. One has been with us for over a decade, dutifully repeating \"Sorry, I didn't catch that.\" The other showed up overnight and can talk about anything. They look like peers — but they're running two different generations of technology. This page shows you where the gap is.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-zero-faq-money',
          title: 'Spending & Safety',
          desc: 'One question per page: cost, accounts, and privacy',
          lessons: [
            { file: 'zero-q-free-vs-paid.html', title: "Is Free AI Enough? When Is Paying Worth It?", desc: "Open any AI product today and you can have a great chat for free. So what does the paid tier actually add? This page takes the free tier apart, then helps you find your match and decide whether the money is worth it.", tag: 'Interactive' },
            { file: 'zero-q-api-vs-membership.html', title: "What Is an API? How Is It Different from a Membership?", desc: "You keep seeing people say “top up a key” or “call the API” — it sounds like insider slang. It's actually the same thing as the membership you pay for every month: you're paying for AI. They're just two completely different ways to pay. This page uses a grocery analogy to make it clear.", tag: 'Interactive' },
            { file: 'zero-q-image-cost.html', title: "Why Does Generating One Image Cost Dozens of Times More Than a Chat?", desc: "Many AI apps let you chat as much as you like, but the moment you generate an image there's a fee or a quota. The product isn't being stingy — in cost terms, images really are a different species.", tag: 'Interactive' },
            { file: 'zero-q-video-cost.html', title: "Why Is AI Video Generation So Expensive?", desc: "The previous page said one image costs a few cents. Video? It's priced by the second — roughly ¥1.5 to ¥5 per second. Generating one 10-second clip costs as much as tens of thousands of chat messages. Why?", tag: 'Interactive' },
            { file: 'zero-q-relay.html', title: "What Are API Relay Resellers? Why We Don't Really Recommend Them", desc: "Once you start tinkering with AI tools, sooner or later you'll see ads like: \"GPT / Claude API from 70% off, ready to use instantly.\" These are \"relay resellers.\" Let's be clear upfront: this isn't saying all the sellers are bad actors — it's that the structure itself carries a few risks worth understanding first.", tag: 'Interactive' },
            { file: 'zero-q-reverse-proxy.html', title: "What Are \"Reverse-Proxy Accounts\" and \"Shared Accounts\"?", desc: "\"ChatGPT Plus carpool, ¥9.9 a month\" \"Claude membership, shared account, instant delivery\" — ten-plus times cheaper than the official price. Sounds sweet. This page does the math behind the sweetness.", tag: 'Interactive' },
            { file: 'zero-q-privacy.html', title: "Will My Chat History Be Used for Training?", desc: "Could the things you've said to AI become its “textbook”? This page uses a flow diagram to show where the data actually goes, then tells you which kind of settings hide the switch, and what you should never send.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-zero-trust',
          title: 'What You Can Safely Hand Over',
          desc: 'A three-second trust test',
          lessons: [
            { file: 'zero-6.html', title: "Which Jobs You Can Hand Over with Confidence, and Which Deserve One Extra Check", desc: "You already know it's remarkably capable — and that it makes mistakes with a straight face. One key question remains: faced with a concrete task, how do you decide in three seconds whether to hand it to AI? Play these 8 quick calls first — the rule is hiding in your own answers.", tag: 'Interactive' },
            { file: 'zero-final.html', title: "All Six Intuitions Are in Hand — Where to Next?", desc: "Congratulations on finishing Chapter Zero. Your understanding of AI now surpasses most people who've \"used it for ages but never wondered what it is\". This page first takes stock of your pack, then helps you find the next step that fits you best.", tag: 'Wrap-up' },
          ],
        },
      ],
    },
    {
      id: 'p1',
      num: 'Part 1',
      title: 'How LLMs Came to Be',
      desc: 'From training data and Tokens to the GPT breakthrough, then to the causes of LLM hallucinations and four mitigation strategies — building a complete understanding of LLM fundamentals.',
      color: '#0066ff',
      group: 'main',
      routes: ['pro', 'pm', 'build'],
      topics: [
        {
          id: 't-basic',
          title: 'Core Principles',
          desc: 'Training data, training vs inference, vocabulary and attention',
          lessons: [
            { file: 'training-data.html', title: "AI's Food: Training Data", desc: "To teach an AI to speak, you first have to feed it trillions of words. It has read the vast majority of everything humanity has ever written.", tag: 'Interactive' },
            { file: 'train-vs-infer.html', title: "Training vs. Inference: Two Completely Different Processes", desc: "Many people assume AI learns something new with every response. In reality, that's completely not the case.", tag: 'Concept' },
            { file: '1-2-vocab.html', title: "Vocabulary & Training", desc: "The first step in LLM learning: reading the massive text data provided by humans.", tag: 'Interactive' },
            { file: '1-2-base.html', title: "Base Model: The Token-by-Token Prediction Machine", desc: "The raw model you get after training does exactly one thing.", tag: 'Animation' },
            { file: '1-2-gpt.html', title: "GPT's Leap", desc: "Why PreTraining Changed Everything: from CNN/RNN/BERT to GPT — the most important step in the history of large language models.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-chat',
          title: 'From Completion to Chat',
          desc: 'How a completion machine became a chatbot',
          lessons: [
            { file: '1-2-api.html', title: "The Mystery of chat/completions", desc: "We're clearly having a conversation with a large language model — so why does OpenAI's API path say \"completions\"? The answer to this naming choice reveals the true nature of LLMs.", tag: 'Animation' },
            { file: '1-2-fake-chat.html', title: "A language model only knows how to complete text —so what if I fabricate a chat log and ask it to finish it?", desc: "You can only predict the next token, right? So I'll craft a format: \"Here's an unfinished chat log — fill in the assistant's reply.\"", tag: 'Animation' },
            { file: '1-2-sft.html', title: "Chat Template + SFT: Large Models Finally Learn to \"Talk\"", desc: "The gap between a completion machine and a conversational assistant is this training paradigm.", tag: 'Concept' },
            { file: '1-2-prompt-power.html', title: "Why Are Prompts Enough? The Answer Lies in the Context Window", desc: "After PreTraining: no need to retrain — just feed the task description in. But why does that work?", tag: 'Interactive' },
          ],
        },
        {
          id: 't-hallucination',
          title: 'Hallucinations & Four Mitigations',
          desc: 'Why hallucinations happen, and four mitigation strategies: Prompt / RAG / Temperature / Evaluation',
          lessons: [
            { file: '1-2-hallucination.html', title: "LLM Hallucination", desc: "The model doesn't know facts — it's just doing probabilistic sampling. Watch it fabricate with confidence: choose a case, click \"Start Generating,\" and observe how hallucinations emerge token by token.", tag: 'Case Study' },
            { file: '1-2-mitigation-prompt.html', title: "Prompt Engineering: Constraining Hallucinations with Instructions", desc: "A PM's perspective: how to reduce model fabrication via System Prompt when writing requirement documents and integrating AI APIs.", tag: 'Concept' },
            { file: '1-2-mitigation-rag.html', title: "RAG: Let the Model \"Take an Open-Book Exam\"", desc: "PM perspective: When do you need RAG? How do you design the retrieval pipeline? Where are the real pitfalls?", tag: 'Interactive' },
            { file: 'rag-advanced.html', title: "RAG Costs & Optimization Strategies", desc: "Every RAG query costs extra. Without optimization, costs spiral out of control as usage grows.", tag: 'PM Advanced' },
            { file: '1-2-mitigation-temp.html', title: "Mitigation 3: Temperature & Top-P", desc: "PM Perspective: How to configure sampling parameters when integrating APIs — recommended values and risk boundaries for different business scenarios. Technique 03 / 04 · Prevention.", tag: 'Interactive' },
            { file: '1-2-mitigation-eval.html', title: "Mitigation 4: Evaluation + Human Review", desc: "PM perspective: quantifying hallucination risk, designing tiered review workflows, and making Human-in-the-Loop your product's safety net. Strategy 04 / 04 · Detect + Correct.", tag: 'Concept' },
          ],
        },
        {
          id: 't-summary1',
          title: 'Part Recap',
          desc: 'Part 1 key takeaways review',
          lessons: [
            { file: 'summary-1.html', title: "Summary (Part 1) · What is an LLM + Hallucination", desc: "Chapter 1 · Review & Recap · Part 1: LLM basics — what it is and why hallucinations occur.", tag: 'Recap' },
            { file: 'summary-1b.html', title: "Summary (Part B) · Mitigation Strategies + Decision Framework", desc: "Chapter 1 · Review · Part B: how to mitigate hallucinations, and the decision framework every AI PM should carry.", tag: 'Recap' },
          ],
        },
        {
          id: 't-build1',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can start doing today',
          lessons: [
            { file: 'build-1.html', title: "Don't stop at \"I get it.\" Lock That One Job Down first", desc: "After the fundamentals, the usual trap is this: you feel like you learned a lot, then you close the laptop and your hands have nothing new to show.So from here on, every chapter ends with a page like this. It answers one question: after this chapter, what can you actually do today.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-interview1',
          title: 'They Will Quiz You',
          desc: 'How interviewers, bosses, and tech colleagues will test you on this chapter',
          lessons: [
            { file: 'interview-1.html', title: "LLM Fundamentals · 30 Must-Answer Questions", desc: "You've finished Chapter 1 — but there's a gap between understanding and being able to explain it under pressure. These 30 questions come from three real scenarios: try to answer each one out loud before reading the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p2',
      num: 'Part 2',
      title: 'AI Harness',
      desc: 'Context engineering, advanced Prompt techniques and security, Agent design and tool calling, a five-layer cost optimization system — turning LLMs into real products.',
      color: '#7c3aed',
      group: 'main',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-context',
          title: 'Context Engineering',
          desc: 'AI\'s working memory and overflow handling',
          lessons: [
            { file: '5-1.html', title: "Context Window: AI's Working Memory", desc: "Module 5 · Context Engineering · Page 1. Drag the slider below to experience window overflow firsthand.", tag: 'Interactive' },
            { file: '5-2.html', title: "Context Overflow: Three Handling Strategies", desc: "Module 5 · Context Engineering · Page 2. Click a strategy to see a step-by-step demonstration below.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-prompt',
          title: 'Prompt Engineering',
          desc: 'Markdown, role-play, advanced techniques, and output formatting',
          lessons: [
            { file: '6-0a.html', title: "Why LLMs Choose Markdown", desc: "Module 6 · Prompt Engineering · Prerequisite. A step-by-step derivation of why Markdown wins.", tag: 'Animation' },
            { file: '6-0b.html', title: "Markdown Syntax and Engineering Rendering", desc: "Module 6 · Prompt Engineering · Prerequisites. Click on syntax elements to see source/render comparisons, then explore frontend rendering library options.", tag: 'Interactive' },
            { file: '6-1.html', title: "Tell It What to Be, and It Becomes That", desc: "By specifying a role in the System Prompt, the same model can transform into a completely different assistant. Role-play is the most fundamental and effective Prompt technique. Click the roles and formats below to see how the output changes.", tag: 'Interactive' },
            { file: '6-2.html', title: "Advanced Prompt Techniques", desc: "Master 4 techniques to double the quality of model responses. Click a technique to see a live good-vs-bad comparison below.", tag: 'Interactive' },
            { file: '6-3.html', title: "Output Format Trade-offs", desc: "There is no universally best format — only the format best suited to the use case. The impact of format choice becomes especially apparent during streaming. Select a format and click \"Start Streaming Demo\" to observe the Token generation experience differences.", tag: 'Interactive' },
            { file: '6-4.html', title: "Streaming Output & Format Coordination", desc: "LLMs output Token by Token. The same response content, in different formats, produces completely different streaming experiences. Select a scenario and click Play to observe the rendering differences across three formats.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-security',
          title: 'Prompt Security',
          desc: 'Prompt Injection: principles, cases, and defense in practice',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'prompt-attack.html', title: "Prompt Injection: Why Do Attacks Succeed?", desc: "Prompt Injection is one of the most serious security threats facing LLM-based applications. It shares the same root cause as SQL injection: data and instructions share the same channel.", tag: 'Security' },
            { file: 'prompt-attack-cases.html', title: "Prompt Injection: 12 Attack Cases", desc: "12 real-world validated attack cases across 5 categories. Select a case, toggle between \"Compromised\" and \"Defended\" to see two outcomes of the same attack with and without protection.", tag: 'Security' },
            { file: 'prompt-defense.html', title: "Prompt Defense: Three-Layer Interception in Practice", desc: "Using the real product MoodVerse as an example, see how input filtering, System Prompt security constraints, and output leak detection work together to intercept Prompt injection layer by layer. Click through the tabs to learn step by step — the third tab lets you simulate a full attack chain yourself.", tag: 'Hands-on' },
            { file: 'ai-safety-redlines.html', title: "AI Safety Red Lines: Four Non-Negotiable Principles", desc: "Four absolute non-negotiables when your enterprise uses AI. Remember these four, and you avoid 90% of AI security incidents. Click any red-line card to see details. Violating any one of them = a security incident.", tag: 'Security' },
            { file: 'ai-safety-governance.html', title: "Risk Tiers & Accountability", desc: "Using AI isn't just about whether it works. Match control intensity to risk tier (L1/L2/L3), and clarify who is accountable via the responsibility chain (User/Approver/Manager). Click any item on the left for details.", tag: 'Security' },
          ],
        },
        {
          id: 't-agent',
          title: 'Agent Engineering',
          desc: 'Agent capabilities, tool calling, ReAct, memory, Skill, and scaffolding',
          routes: ['pm', 'build'],
          lessons: [
            { file: '7-1.html', title: "Agent: AI That Gets Things Done", desc: "Click a capability card to see a step-by-step demonstration of how an Agent executes in real-world scenarios.", tag: 'Interactive' },
            { file: '7-2.html', title: "The Secret of Tool Calls", desc: "The model doesn't actually execute code — it just outputs structured text, and the framework code is responsible for parsing and executing it. Scroll down to automatically trace the complete call chain.", tag: 'Interactive' },
            { file: '7-2a.html', title: "5 Messages Behind One Conversation", desc: "Left: what the user sees | Right: what actually happens in the API. Scroll down to auto-play what happens behind a single weather query.", tag: 'Deep Dive' },
            { file: '7-2b.html', title: "The Art of Tool Descriptions", desc: "The same task — failure on the left, success on the right — the only difference is the description. Select an experiment scenario and click Run to see the comparison.", tag: 'Deep Dive' },
            { file: '7-2c.html', title: "Multi-Tool Orchestration: Concurrent vs. Sequential", desc: "When the model returns 3 tool calls in one turn, how do you choose the execution order? Pick a mode, click the demo, and observe the time difference.", tag: 'Deep Dive' },
            { file: '7-2d.html', title: "MCP Protocol: The USB Interface for AI Tools", desc: "Before USB, every device needed its own cable. Before MCP, every Agent needed its own custom integration code.", tag: 'Deep Dive' },
            { file: '7-3.html', title: "ReAct in Practice: When the Agent Gets Stuck", desc: "ReAct loop: Thought → Action → Observation, repeat. But if the model doesn't know the parameter format required by an API, it will keep guessing, spinning in circles at the same spot. Scroll down to automatically trace a real failure process.", tag: 'Animation' },
            { file: '7-3a.html', title: "Short-Term Memory = Context Window", desc: "The context window is the model's workspace: everything the model can see must be placed on this desk. Scroll down and watch how the workspace gets filled up.", tag: 'Deep Dive' },
            { file: '7-3b.html', title: "Context Compression: Four Layers of Defense", desc: "Drag the slider to simulate conversation growth and observe how compression extends context lifespan.", tag: 'Deep Dive' },
            { file: '7-3c.html', title: "Long-term Memory: Vector Retrieval", desc: "Let the Agent remember last month: through vector retrieval, inject user preferences, project config, and historical bugs into the current conversation.", tag: 'Deep Dive' },
            { file: 'vector-db-1.html', title: "From Embeddings to Milvus", desc: "A model turns meaning into coordinates; Milvus finds the nearest meanings across millions or billions of those coordinates.", tag: 'Deep Dive' },
            { file: 'vector-db-2.html', title: "The Milvus Mental Model", desc: "Start with tables, columns, and rows, then add the two vector-specific ideas: ANN indexes and loading for search.", tag: 'Deep Dive' },
            { file: 'vector-db-3.html', title: "Hands-on Milvus", desc: "Use one collection name and real text embeddings from insert through delete. This example assumes local Milvus is already listening on port 19530.", tag: 'Hands-on' },
            { file: 'vector-db-4.html', title: "From Retrieval to RAG", desc: "Search returns possibly relevant chunks. RAG must turn them into bounded, citable, and measurable evidence.", tag: 'Deep Dive' },
            { file: '7-4a.html', title: "ReAct Loop: Think → Act → Observe", desc: "Reasoning + Acting: an Agent completes tasks through repeated loops — a single question-and-answer is just one round. Scroll down to watch a complex task unfold across 14 loops automatically.", tag: 'Deep Dive' },
            { file: '7-4b.html', title: "5 Patterns of Agent Deadlocks", desc: "Click a card below to select a failure mode → Play the failure simulation → Compare behavior with protection applied.", tag: 'Deep Dive' },
            { file: '7-4c.html', title: "Permissions & Safety", desc: "What can an Agent do — and what should it not? Switch between three permission modes and observe how the same set of actions is handled differently.", tag: 'Deep Dive' },
            { file: '7-5.html', title: "Skill: Getting Agents to the Destination Faster", desc: "Select a scenario, watch the auto-play demo, and compare the \"bad loop\" vs \"good loop\" execution approaches.", tag: 'Interactive' },
            { file: '7-5a.html', title: "The Essence of Skill", desc: "Equipping an Agent with an \"Operations Manual\": an Agent without Skills is like a new hire feeling their way; an Agent with Skills is like a veteran following standard procedures.", tag: 'Deep Dive' },
            { file: '7-5b.html', title: "Dissecting a Real-World Skill", desc: "Using the example assistant Release Assistant as an example: click each section to expand details and see how an Agent reads and executes a Skill.", tag: 'Deep Dive' },
            { file: '7-4.html', title: "Scaffolding Engineering: From Prototype to Production", desc: "The left panel simulates the same \"flight search + hotel booking\" task with and without scaffolding — auto-plays when you scroll to the demo. Click the right panel to explore the 5 key capabilities in detail.", tag: 'Interactive' },
            { file: '7-6a.html', title: "5 Engineering Guardrails", desc: "An Agent without guardrails = a sports car without brakes. Click each guardrail on the left to see the scenario breakdown and the comparison with/without the guardrail.", tag: 'Deep Dive' },
            { file: '7-6b.html', title: "Multi-Agent Collaboration: When One Agent Isn't Enough, Deploy a Team", desc: "Main Agent breaks tasks → Sub-Agents each handle their specialty → Aggregate and deliver. Read-only tasks run in parallel for speed; write tasks run in series for safety.", tag: 'Deep Dive' },
            { file: '7-6c.html', title: "Observability: What Is the Agent Doing and How Much Is It Costing?", desc: "Event stream + stats panel · Monitor the full Agent lifecycle in real time. Click \"Simulate a Task\" to see the complete event stream for a real task.", tag: 'Deep Dive' },
            { file: '7-summary.html', title: "Agent Engineering Landscape", desc: "A complete knowledge map of the four pillars: Tools, Memory, Execution, and Engineering · 14 knowledge nodes.", tag: 'Recap' },
          ],
        },
        {
          id: 't-cost',
          title: 'Cost Optimization & Model Selection',
          desc: 'KV Cache, caching, image Tokens, syntax/semantic/output-layer optimization, and model selection',
          routes: ['pm', 'build'],
          lessons: [
            { file: '8-1.html', title: "Why Do Multi-Turn Conversations Get More Expensive?", desc: "LLMs charge per input Token. Every turn requires resending the full conversation history — the longer the history, the more Tokens, and the higher the cost. Drag the slider to simulate cost accumulation.", tag: 'Interactive' },
            { file: '8-2.html', title: "KV Cache: Trading Space for Speed", desc: "In every conversation turn, the model runs Attention computation over all historical Tokens. KV Cache stores the already-computed K/V matrices so only new Tokens need to be computed next turn.", tag: 'Interactive' },
            { file: '8-2b.html', title: "Explicit Cache: Practical Comparison", desc: "One line of code — guaranteed hits. In production, you must use explicit caching: implicit caching is unreliable in distributed architectures.", tag: 'Interactive' },
            { file: '8-3.html', title: "Dynamic Timestamps: The Most Expensive System Prompt", desc: "One small design mistake can completely invalidate your KV Cache and double the cost of every conversation: putting a dynamic timestamp in your System Prompt.", tag: 'Anti-pattern' },
            { file: '8-4.html', title: "Comprehensive Cost Optimization", desc: "Single optimizations have limited impact. Layered, combined strategies can reduce AI costs by 70–90%. Click the strategy cards below to watch the cost bar change in real time.", tag: 'System Design' },
            { file: '8-5.html', title: "Image Tokens: pixels cost money too", desc: "Multimodal models don't bill per image — they slice images into pixel tiles and count each as Tokens. Drag the slider to change resolution and see the Token cost change in real time.", tag: 'Multimodal' },
            { file: '8-5b.html', title: "Image Tokens: match resolution to task", desc: "Different tasks require different levels of image detail. Using the lowest resolution that meets the task = maximum savings. Select a task type to see the recommended resolution plan.", tag: 'Multimodal' },
            { file: '8-6.html', title: "Syntax-Level Optimization: Prompts for Machines — Skip the Formatting", desc: "Formatting tokens can account for up to 13–20% of prompt length. Prompts are instructions for machines, not documents for humans. Those **bold** markers, JSON braces, and indented newlines… are all money spent on formatting.", tag: 'Prompt Craft' },
            { file: '8-7.html', title: "Semantic-Layer Optimization: Don't Treat the Context Window as a Trash Can", desc: "Higher information density → more focused attention → better results. Three semantic-layer strategies to make every Token count.", tag: 'RAG' },
            { file: '8-8.html', title: "Output Layer + Advanced KV Cache: Control Output = Control Cost", desc: "Output tokens cost 3–5× more than input tokens. Click the techniques below to switch interactive demos and experience three output-layer techniques and two advanced KV Cache traps.", tag: 'Architecture' },
            { file: 'cost-eval.html', title: "Model Selection: Trade-offs of Capability vs. Cost", desc: "Once optimization is done, you still need to pick the right model. Click the questions below to switch perspectives, and view the scatter plot, monthly cost comparison, and scenario decision framework.", tag: 'Selection' },
            { file: 'engineering-philosophy.html', title: "Simplicity Is the Ultimate Sophistication: Upholding First Principles", desc: "AI Harness · Closing reflections. Four steps back to basics to see clearly the essence of every Harness technique.", tag: 'Finale' },
          ],
        },
        {
          id: 't-tips',
          title: 'Practical Tips',
          desc: 'Human-AI boundaries, asking better questions, iteration methods, scenario judgment, and hallucination verification — a daily guide for using AI',
          lessons: [
            { file: 'ai-tips-boundary.html', title: "Human–AI Knowledge Boundaries: The Four-Quadrant Strategy", desc: "First identify which quadrant the question falls in, then decide how to use AI. Before every AI interaction, ask yourself one question: Can I verify this answer?", tag: 'Tips' },
            { file: 'ai-tips-context.html', title: "Good vs Bad Prompts: Context Is Everything", desc: "Same AI, different ways of prompting—completely different outputs. Click a scenario to compare.", tag: 'Tips' },
            { file: 'ai-tips-verify.html', title: "Can You Trust What AI Says?", desc: "Identify AI-fabricated content. Click the items you think are problematic, then reveal the answers.", tag: 'Tips' },
            { file: 'ai-tips-iterate.html', title: "The Art of Iteration: Knowing When to Stop", desc: "Walk through 4 rounds of a real copywriting iteration: quality keeps rising through round 3, then round 4 overshoots. The demo will auto-play round by round — watch the quality meter closely.", tag: 'Tips' },
            { file: 'ai-tips-scenarios.html', title: "Scenario Guide: When to Trust AI", desc: "9 common scenarios ranked into three risk tiers. Click a scenario card on the left to view the detailed guide, or filter by risk level.", tag: 'Tips' },
          ],
        },
        {
          id: 't-summary2',
          title: 'Course Wrap-Up',
          desc: 'Part 2 review + full course summary',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'summary-2.html', title: "Summary (Part 1) · Prompt Engineering + Agent", desc: "Chapter 2 review · Part 1 of 2: core skills for designing a Message List, and the Agent engineering that takes AI from \"saying\" to \"doing.\"", tag: 'Recap' },
            { file: 'summary-2b.html', title: "Summary (Part B) · Cost Optimization + PM Perspective", desc: "Chapter 2 Review · Page 2 of 2: The five-layer cost optimization system, and the complete engineering perspective an AI PM takes away.", tag: 'Recap' },
            { file: 'summary-final.html', title: "Course Summary · An AI Primer for Product Managers", desc: "What did you learn today? Take these four things with you: LLM Fundamentals, Prompt Engineering, Agent & Cost, Safety & Compliance.", tag: 'Recap' },
            { file: 'summary-final-1.html', title: "Summary (Part 1) · Fundamentals + Harness", desc: "Course summary, part 1 of 2: Module 1 \"How LLMs Are Built\" builds your cognitive intuition; Module 2 \"How to Write Effective Prompts\" gets AI to output what you actually want.", tag: 'Recap' },
            { file: 'summary-final-2.html', title: "Summary (Part 2) · Practice + Cost", desc: "Course summary, Part 2 of 2: Module 3 \"What Can AI Do & What Does It Cost\" builds automation and cost awareness; Module 4 \"Security, Compliance & Red Lines\" clarifies where your product needs to be defended.", tag: 'Recap' },
          ],
        },
        {
          id: 't-build2',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can start doing today',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'build-2.html', title: "Write one prompt. Make Five Runs in a Row All Usable", desc: "This chapter you learned context, Prompt techniques, Agents, and cost — the densest lesson count in the course. On the desk, though, there is only one first job: take the requirement you locked in at M0 and write a stable prompt. Stable means it doesn't depend on luck.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-interview2',
          title: 'They Will Quiz You',
          desc: 'How interviewers, bosses, and tech colleagues will test you on this chapter',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'interview-2.html', title: "AI Harness · 30 Essential Questions", desc: "Chapter 2 covers engineering in practice: context, Prompt, security, Agent, and cost. These 30 questions come from three real scenarios — answer them yourself first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p3',
      num: 'Part 3',
      title: 'Practice · From Demo to Product',
      desc: "Use a fictional content assistant to explore images, tools, context, memory, prompts, collaboration, permissions and MCP. These examples are not launched Fangpian products or verified project results.",
      color: '#059669',
      group: 'main',
      prereq: 'Suggested first: AI Harness',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-alice-intro',
          title: 'Opening',
          desc: "A fictional content assistant illustrates the engineering decisions between calling a model and delivering reliable results. It is not a product already launched by Fangpian.",
          lessons: [
            { file: '9-0.html', title: "From a business task to a deliverable AI tool", desc: "A fictional content assistant illustrates the engineering decisions between calling a model and delivering reliable results. It is not a product already launched by Fangpian.", tag: 'Intro' },
          ],
        },
        {
          id: 't-imagegen',
          title: 'AI Image Generation',
          desc: 'Text-to-image, image-to-image, character consistency, multi-model fallback, and productization',
          lessons: [
            { file: '9-1.html', title: "Text-to-Image vs. Image-to-Image: Two Completely Different Things", desc: "Compare text-only generation and reference-guided generation using one fictional character. Check appearance, setting and action in both results.", tag: 'Concept' },
            { file: '9-2.html', title: "Using AI to Write Prompts for AI", desc: "The user says \"example character is daydreaming on the balcony.\" The image model needs a long, precise visual description — that one sentence is far from enough. There is a translation step in the middle: using an LLM to translate plain language into image generation language.", tag: 'Hands-on' },
            { file: '9-3.html', title: "Character Consistency: The Hardest Product Problem", desc: "Keep a fictional character consistent across settings and outfits. Compare references and generated results to identify changes in appearance.", tag: 'Case Study' },
            { file: '9-4.html', title: "When the Model Goes Down, Then What?", desc: "In example assistant, the user says \"draw me a picture,\" but behind the scenes Gemini may have timed out, Seedream rate-limited, and GPT Image errored. The user doesn't care which model failed — they only care: will the image come out?", tag: 'Hands-on' },
            { file: '9-5.html', title: "Image Generation Productization Checklist", desc: "Connecting an image API is only a start. Use a teaching example to check experience, quality, engineering and safety before release.", tag: 'System Design' },
          ],
        },
        {
          id: 't-agentloop',
          title: 'Agent Loop',
          desc: 'Production-grade loop control, safeguards, and streaming UX',
          routes: ['build'],
          lessons: [
            { file: '9-6.html', title: "Textbook's 3 Steps vs. Real-World N Steps", desc: "Textbooks say the Agent loop is three steps: Think→Act→Observe. But when you actually push an Agent into production, each cycle involves far more than you might imagine.", tag: 'Concept' },
            { file: '9-7.html', title: "Why Agents Get Stuck in Infinite Loops", desc: "Infinite loops in the lab are easy to catch — just glance at the console. But failures in production are far more subtle: users won't say \"your Agent is looping.\" They'll say \"why is your AI so slow\" or \"is it broken?\"", tag: 'Case Study' },
            { file: '9-8.html', title: "Foolproof Design: How to Make the Loop Stop Itself", desc: "Now that we know how Agents can get stuck, the next step is to design safeguards. Good foolproofing is a three-layer net that keeps the system from losing control without giving up too easily.", tag: 'Hands-on' },
            { file: '9-9.html', title: "Streaming UX: Don't Leave Users Waiting", desc: "When an Agent runs for 30 seconds in the background, what should the user see? The same 30-second wait feels completely different with or without a sense of progress.", tag: 'Interactive' },
            { file: '9-10.html', title: "The Real Cost Behind a Single Message", desc: "The user sent just one message, but under the hood, the Agent may have run 10+ loops and generated dozens of API calls. When you open the billing dashboard, you might be in for a shock.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-ctxmgmt',
          title: 'Context Management',
          desc: 'Longer conversations get more expensive and less smart: the art and trade-offs of compression',
          routes: ['build'],
          lessons: [
            { file: '9-11.html', title: "Longer Conversations Cost More and Get Dumber", desc: "Every conversation turn re-sends the full history to the model: the longer the conversation, the higher the cost, the more scattered the attention, and the closer you get to the context window limit. These three problems make it clear: context cannot be left unmanaged.", tag: 'Concept' },
            { file: '9-12.html', title: "Compression Is the Art of Trade-offs", desc: "What to do when the context is too long? Neither deleting everything nor keeping everything is right: some can be deleted (old tool outputs), some cannot be deleted (user's exact words), and some need paid compression (full summary). Product managers need a decision framework.", tag: 'Hands-on' },
            { file: '9-13.html', title: "Can You Delete What the User Said?", desc: "AI output can be summarized, tool results can be truncated, but once the user's original words are deleted, they're gone forever. And the user will always notice: \"I clearly said xxx — how did you forget?\"", tag: 'Concept' },
            { file: '9-14.html', title: "Local Compression vs. LLM Compression", desc: "There are two paths to compressing context: local processing (regex replacement, truncation) is zero-cost but crude; LLM summarization costs money but is precise. Which to choose? Both — but in the right order.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-memory',
          title: 'Long-Term Memory',
          desc: 'Making AI know you: memory extraction, conflicts, and injection',
          routes: ['build'],
          lessons: [
            { file: '9-15.html', title: "Context ≠ Memory", desc: "The context window is like a whiteboard: fill it up and it erases, end the conversation and it clears. Long-term memory is like a notebook: what you write down is still there next time you open it. AI products need both systems.", tag: 'Concept' },
            { file: '9-16.html', title: "What's Worth Remembering and What Isn't", desc: "Users send dozens or even hundreds of messages to AI every day. Phrases like \"Uh-huh,\" \"OK,\" and \"Haha\" make up the majority; genuinely valuable preferences and facts may be just a handful. A memory system needs a gatekeeper.", tag: 'Hands-on' },
            { file: '9-17.html', title: "Memory Conflict: What to Do When the User Changes Their Mind", desc: "Last month the user said \"I like coffee.\" This month they say \"I switched to tea.\" Two memories conflict: should the old one be deleted? How should the new one be stored? There are four strategies.", tag: 'Case Study' },
            { file: '9-18.html', title: "The Cost Problem of Memory Injection", desc: "You stored 1,000 memory entries — do you stuff them all into the system prompt every conversation? Or retrieve only the relevant few on demand? Full injection is simple but costly and noisy; on-demand retrieval saves money but can miss things.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-prompteng',
          title: 'Prompt Harness',
          desc: 'From strings to architecture: layering, on-demand loading, and Skill modularization',
          routes: ['build'],
          lessons: [
            { file: '9-19.html', title: "System Prompt Is Not a Blob of Text", desc: "A production-grade System Prompt is not written by stream of consciousness. It is layered: Identity, Environment, Tool, and Behavior — each layer handles its own domain so changing one doesn't affect the others.", tag: 'Architecture' },
            { file: '9-20.html', title: "Don't Show AI What It Doesn't Need", desc: "If you have 100 tools and cram all their descriptions into the System Prompt, just the tool descriptions alone can consume tens of thousands of tokens. AI, like humans, loses focus when given too much information.", tag: 'Hands-on' },
            { file: '9-21.html', title: "Skill: An Operatable Prompt Module", desc: "System Prompt defines who the AI is; Tool defines what the AI can do — so what does Skill govern? It governs how to handle a specific situation, step by step. File-as-configuration, version-traceable.", tag: 'Hands-on' },
            { file: '9-22.html', title: "The Subtle Relationship Between Prompts and Caching", desc: "The rule of KV Cache is extremely simple: if the prefix is identical, it's a hit; differ by even one character and everything is recomputed. So injecting any dynamic content into the System Prompt may make the cache permanently miss.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-multiagent',
          title: 'Multi-Agent',
          desc: 'Parallelism, brainstorming, scheduled tasks, and collaboration cost',
          routes: ['build'],
          lessons: [
            { file: '9-23.html', title: "When Do You Need Multiple Agents", desc: "More Agents isn't always better. Most of the time, one is enough. But there are three real scenarios where a single Agent can't handle it alone. Know when you actually need to divide the work.", tag: 'Concept' },
            { file: '9-24.html', title: "The Cost of Concurrency: Who Can Run in Parallel", desc: "Reads can be parallel: multiple searches running simultaneously won't conflict. Writes must queue: two Agents modifying the same file at the same time will cause data corruption. The key question for whether an operation can run concurrently: is it read-only?", tag: 'Hands-on' },
            { file: '9-25.html', title: "Brainstorm: Let Multiple AIs Argue", desc: "Just like human meetings: one person thinking until exhausted is inferior to multiple people thinking independently then consolidating. Brainstorm mode is throwing the same question to multiple Agents, letting each answer independently, then having a moderator integrate consensus and divergence.", tag: 'Interactive' },
            { file: '9-26.html', title: "The Cost Trap of Scheduled Tasks", desc: "Having an Agent summarize news every hour sounds simple. But if you reuse the old session, the context grows with every run — after 24 hours your costs explode. One choice can make the monthly bill differ by 10×.", tag: 'Anti-pattern' },
          ],
        },
        {
          id: 't-security',
          title: 'Permissions & Security',
          desc: 'The Agent\'s reins: permission tiers, approvals, and observability',
          routes: ['build'],
          lessons: [
            { file: '9-27.html', title: "How Much Freedom Should AI Have", desc: "Give AI full permissions? It might break everything. Approve every step? Users will go crazy. Permission design is a spectrum: from fully autonomous to step-by-step approval, with three more options in between.", tag: 'Concept' },
            { file: '9-28.html', title: "Too Many Popups Frustrate Users; No Popups Means No Safety", desc: "If an Agent pops up a confirmation for every single step, you'll want to uninstall it after clicking \"Allow\" five times. But if it executes everything without asking, who's responsible for deleting the wrong file? The answer: risk-level grading.", tag: 'Hands-on' },
            { file: '9-29.html', title: "Do You Know What Your Agent Did?", desc: "Your Agent ran for 3 minutes in the background: how many tools did it call? How many tokens did it spend? Were there any errors? If you can't answer these questions, your Agent is a black box.", tag: 'Architecture' },
          ],
        },
        {
          id: 't-mcp',
          title: 'MCP in Practice',
          desc: 'The tool ecosystem\'s bidirectional connection: consuming, providing, and self-configuration',
          routes: ['build'],
          lessons: [
            { file: '9-30.html', title: "MCP Is More Than Just \"Calling Tools\"", desc: "Most people understand MCP as simply \"letting AI call external tools.\" But the MCP protocol is bidirectional: example assistant can call other tools, and external clients like Cursor can also call example assistant's capabilities.", tag: 'Concept' },
            { file: '9-31.html', title: "Lazy Connect: Don't Connect Until Needed", desc: "You registered 10 MCP services and connect them all on startup? If 3 of them go down, your startup will hang. The lazy connect philosophy is simple: registration ≠ connection — connect only when actually needed.", tag: 'Hands-on' },
            { file: '9-32.html', title: "AI Adds Its Own Tools", desc: "The user says \"check my calendar,\" but you haven't configured a calendar tool. The old way: throw an error saying \"not supported.\" The better way: the Agent configures it itself and just asks your permission.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-summary3',
          title: 'Practice Wrap-Up',
          desc: 'Full overview and core insights',
          lessons: [
            { file: '9-summary.html', title: "Practicum Panorama", desc: "Having reached the end of Part Three, eight topics form a complete AI product practicum map. No topic stands alone — together they answer one question: what exactly is the gap from Demo to product?", tag: 'Recap' },
            { file: '9-final.html', title: "Chat Wrapper vs a True Agent Product", desc: "Users see only the tip of the iceberg: a chat box and a few replies. Beneath the surface lie 100 product decisions the PM must make. The sum of those decisions is the distance between a chat wrapper and a true Agent product.", tag: 'Finale' },
          ],
        },
        {
          id: 't-build3',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can start doing today',
          lessons: [
            { file: 'build-3.html', title: "From “can talk” to “can do”: wire up the first tool", desc: "A prompt can produce a stable draft. Now connect one tool operation that can be verified, reversed or handed to a person.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-interview3',
          title: 'They Will Quiz You',
          desc: 'How interviewers, bosses, and tech colleagues will test you on this chapter',
          lessons: [
            { file: 'interview-3.html', title: "Practice · From Demo to Production · 30 Soul-Searching Questions", desc: "You've completed Chapter 3 and now know what separates a Demo from a production product. These 30 questions come from three real scenarios — try answering them out loud first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p4',
      num: 'Part 4',
      title: 'Advanced · AI Engineering Design Patterns',
      desc: 'Based on Anthropic\'s open-sourced Claude Code and engineering blog posts — deep dives into production Agent design patterns: context engineering, tool design, evaluation methodology, long-running Agents, brain-hand separation architecture, and security containerization.',
      color: '#dc2626',
      group: 'main',
      prereq: 'Suggested first: Practice · From Demo to Product',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-agent-patterns',
          title: 'Agent Design Patterns',
          desc: 'Anthropic\'s five Workflow types + autonomous Agent',
          lessons: [
            { file: '10-1.html', title: "Workflow vs Agent: Know What You Need First", desc: "A counterintuitive insight: the most successful AI implementations are rarely the most complex ones. Before you start building an Agent framework, make sure you truly understand what you need.", tag: 'Design Pattern' },
            { file: '10-2.html', title: "Five Workflow Patterns", desc: "Five proven Workflow orchestration patterns — from simple to complex, each solving a specific type of problem. The goal is not the most complex pattern, but the most appropriate one.", tag: 'Design Pattern' },
            { file: '10-3.html', title: "From Prompt Engineering to Context Engineering", desc: "As we move from single-turn conversations to multi-step Agents, optimizing prompts alone is no longer enough. The real challenge is: how do you curate every Token sent to the model at each inference step.", tag: 'Methodology' },
            { file: '10-4.html', title: "Three Strategies for Long-Context Agents", desc: "When a task spans multiple context windows, each new window starts with amnesia. Three battle-tested strategies address this fundamental challenge, keeping Agents coherent and efficient across long tasks.", tag: 'Methodology' },
          ],
        },
        {
          id: 't-tool-design',
          title: 'The Art of Tool Design',
          desc: 'How to write great tools for Agents: naming, descriptions, parameters, and ACI',
          lessons: [
            { file: '10-5.html', title: "ACI: Agent-Computer Interface", desc: "HCI (Human-Computer Interaction) has been studied for decades, but the interaction between Agents and computers (ACI) is just getting started. Practical experience shows that the quality of tool design directly determines an Agent's capability ceiling.", tag: 'Design Pattern' },
            { file: 'vector-db-5.html', title: "Milvus as an Agent Knowledge Tool", desc: "Let the Agent decide when company knowledge is needed. The tool retrieves evidence; the Agent turns the ToolMessage into an answer.", tag: 'Hands-on' },
            { file: '10-6.html', title: "Think Tool: Making AI Think Before Acting", desc: "When executing long tool chains, Agents often forget earlier information or make mistakes when balancing multiple rules. Evidence shows that giving an Agent a tool to pause and think dramatically improves accuracy.", tag: 'Deep Dive' },
            { file: '10-7.html', title: "Using an Agent to Optimize Agent Tools", desc: "Who better to judge tool quality than the Agent itself? Industry has validated a workflow of \"use Agent to write tools → run evaluations → auto-optimize,\" transforming tool design from hand-tuning into systematic iteration.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-evals',
          title: 'Agent Evaluation',
          desc: 'No eval = flying blind. How to systematically verify Agent quality',
          lessons: [
            { file: '10-8.html', title: "Why Evaluation Matters More Than Training", desc: "Building an Agent without evals is like flying blind. Evaluation is core infrastructure that spans the entire development lifecycle — far more than a pre-launch checklist.", tag: 'Methodology' },
            { file: '10-9.html', title: "Three Grader Types: Code, Model, Human", desc: "Graders are the judges of your evaluation system. Choose the wrong Grader and your results become unreliable. Production experience shows that combining all three Grader types — each playing to its strengths — yields the best outcomes. There's no silver bullet, but there is an optimal combination.", tag: 'Hands-on' },
            { file: '10-10.html', title: "Evaluation Pitfalls: Noise, Cheating & Regression", desc: "Running an eval doesn't mean running it right. Three hidden traps repeatedly verified in production: infrastructure noise distorts results, models recognize when they're being tested, and a small change can cause a dramatic performance drop.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-long-running',
          title: 'Long-Running Agents',
          desc: 'From single-turn chat to hours-long runs: Harness design and evolution',
          routes: ['build'],
          lessons: [
            { file: '10-11.html', title: "Why Agents Fail at Long Tasks", desc: "Building a complete web app with an Agent sounds simple, but in practice it's riddled with handoff failures and context fragmentation.", tag: 'Case Study' },
            { file: '10-12.html', title: "Initializer + Coding Agent", desc: "Core idea: split one Agent into two roles — one responsible for planning, one for execution. Every handoff leaves a clean state.", tag: 'Design Pattern' },
            { file: '10-13.html', title: "Managed Agent: Brain-Hand Separation", desc: "Core insight: split the Agent's thinking and execution into independent components, so the system can recover gracefully when any part fails.", tag: 'Architecture' },
            { file: '10-14.html', title: "Session Is Not the Same as Context Window", desc: "The two most commonly confused concepts: what Claude can currently see, versus everything that has happened. They must be kept separate.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-security-advanced',
          title: 'Security & Containerization',
          desc: 'How Anthropic constrains Claude in production',
          routes: ['build'],
          lessons: [
            { file: '10-15.html', title: "Three Risk Categories: Misuse, Misbehavior, External Attack", desc: "Security isn't just adding a prompt layer—it requires structural design at the architecture level. Here we introduce a systematic security classification framework.", tag: 'Security' },
            { file: '10-16.html', title: "Sandbox & Credential Isolation", desc: "Code generated by an Agent and user secrets must never reside in the same place. This is a hard requirement of secure architecture—not merely a best-practice suggestion.", tag: 'Security' },
          ],
        },
        {
          id: 't-summary4',
          title: 'Advanced Wrap-Up',
          desc: 'Full overview and core design principles',
          lessons: [
            { file: '10-17.html', title: "Contextual Retrieval: Better RAG", desc: "The core assumption of RAG is \"retrieve the right Chunk, get the right answer.\" But in practice there is a fundamental problem: the chunking process itself loses critical information. Contextual Retrieval is designed to fix exactly this.", tag: 'Deep Dive' },
            { file: '10-summary.html', title: "Advanced Overview", desc: "From Workflow to Agent, from Prompt Engineering to Context Engineering—this chapter covers the core engineering practices. Let's connect all the topics into a complete knowledge map.", tag: 'Recap' },
            { file: '10-final.html', title: "Build the Simplest Thing That Works", desc: "All complex architectural designs and clever engineering patterns ultimately point to the same simple truth.", tag: 'Finale' },
          ],
        },
        {
          id: 't-build4',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can start doing today',
          lessons: [
            { file: 'build-4.html', title: "Stop saying “it feels better”: build your first eval set", desc: "The first three squares you checked by eye. Fine at small scale. But you’re about to hit the classic trap: you change a prompt, these three cases get better, those two quietly get worse, and you don’t notice. Anthropic says “not evaluating is running naked.” This square puts clothes on your Agent.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-interview4',
          title: 'They Will Quiz You',
          desc: 'How interviewers, bosses, and tech colleagues will test you on this chapter',
          lessons: [
            { file: 'interview-4.html', title: "AI Engineering Design Patterns · 30 Essential Questions", desc: "Chapter 4 is all about engineering judgment for production-grade Agents. These questions are appearing more and more often in interviews and design reviews. Answer them yourself first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p5',
      num: 'Part 5',
      title: 'Harness & Self-Improvement',
      desc: 'From Harness design patterns to recursive self-improvement: when Agents start optimizing their own scaffolding, AI engineering enters a new era. Based on Lilian Weng\'s 2026 frontier survey.',
      color: '#7c3aed',
      group: 'main',
      prereq: 'Suggested first: Advanced · AI Engineering Design Patterns',
      routes: ['build'],
      topics: [
        {
          id: 't-harness-intro',
          title: 'Harness Overview',
          desc: 'Recursive self-improvement and the centrality of Harness',
          lessons: [
            { file: '11-1.html', title: "From Scaffolding to an Self-Improving System", desc: "Harness is more than a wrapper around a model. It is becoming the core engine of AI recursive self-improvement.", tag: 'Frontier' },
            { file: '11-2.html', title: "Three Design Patterns of Harness", desc: "A well-designed Harness speaks a clear pattern language — it is never just a pile of scripts stitched together. Three core patterns account for 90% of the architectural decisions in today's most capable Agent systems.", tag: 'Design Pattern' },
          ],
        },
        {
          id: 't-harness-optimize',
          title: 'Harness Optimization',
          desc: 'From context engineering to automated workflow search',
          lessons: [
            { file: '11-3.html', title: "Context Engineering: From Handcrafted Prompts to Auto-Evolving Systems", desc: "As Agent tasks grow longer, context management is no longer optional. It has become the core battleground of Harness optimization.", tag: 'Frontier' },
            { file: '11-4.html', title: "Workflow Design: From Manual to Automated Search", desc: "The design space for workflows is enormous. We should use algorithms to search it — manual design alone is far from enough.", tag: 'Frontier' },
          ],
        },
        {
          id: 't-harness-self',
          title: 'Self-Improvement & Evolution',
          desc: 'Letting Harness improve itself and using evolutionary algorithms to search the design space',
          lessons: [
            { file: '11-5.html', title: "Letting the Harness Improve Itself", desc: "If an LLM can optimize the code that runs the Agent, it gains access to a design space far larger than hand-written Prompts.", tag: 'Frontier' },
            { file: '11-6.html', title: "Evolutionary Search: Letting the Fittest Harness Survive", desc: "Evolutionary algorithms + coding Agents = automatically discovering optimal solutions in the vast Harness design space.", tag: 'Frontier' },
          ],
        },
        {
          id: 't-harness-future',
          title: 'Future & Reflections',
          desc: 'Fundamental challenges facing self-improvement',
          lessons: [
            { file: '11-7.html', title: "Future Challenges: Seven Hurdles of Self-Improvement", desc: "Researchers have made genuine progress, but the road to full recursive self-improvement still faces several bottlenecks.", tag: 'Frontier' },
          ],
        },
        {
          id: 't-build5',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can start doing today',
          lessons: [
            { file: 'build-5.html', title: "It's sharp for ten turns. What about fifty?", desc: "This chapter is about letting the Harness evolve itself — sounds far from where you are. But every self-improvement starts with a Harness that can go the distance: it knows when to compress, what must never be dropped, and which conclusions belong on disk. You can set these three rules for your Agent today.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-interview5',
          title: 'They Will Quiz You',
          desc: 'How interviewers, bosses, and tech colleagues will test you on this chapter',
          lessons: [
            { file: 'interview-5.html', title: "Harness & Self-Improvement · 30 Soul-Searching Questions", desc: "This chapter covers the most cutting-edge content, and those who test you on it can most easily tell the real from the fake. These 30 questions come from three real scenarios — try answering aloud first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p7',
      num: 'Part 7',
      title: 'Vibe Coding Methodology',
      desc: "Practise workflow control, quality checks, documentation, environment safety and clear communication using public AI collaboration guidelines and teaching examples.",
      color: '#0d9488',
      group: 'indie',
      cluster: 'chain',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-vibe-why',
          title: 'Philosophy & Intro',
          desc: 'Why AI coding fast actually backfires easily, and why Rules are the most stable constraint method',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'vibe-1.html', title: "Why You Need to Set Rules for AI", desc: "Vibe Coding is a development approach where you use natural language to have AI directly generate code. Its problem lies in quality: AI without rules will rework, miss edits, silently delete code, and leave permanent technical debt. This lesson first looks at what failures look like, then examines how to inject constraints most reliably.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-vibe-flow',
          title: 'Flow Control',
          desc: 'Setting human checkpoints before AI starts coding',
          routes: ['pro', 'pm', 'build'],
          lessons: [
            { file: 'vibe-2.html', title: "Four-Step Flow: Restate, PRD, Confirm, Code", desc: "Bringing software engineering's requirements-confirmation phase into human-AI collaboration: the AI must restate requirements, write a PRD, and get explicit approval before writing a single line of code. Add bulk-edit breakpoints and duplicate-detection rules to contain the blast radius before anything is touched.", tag: 'Interactive' },
            { file: 'vibe-3.html', title: "PlayGround: The Component Fitting Room", desc: "Writing UI features directly into the page means one change breaks everything — tweaking a single button requires spinning up the whole page. The solution is to build an isolated component PlayGround first: each UI element has its own demo, and once it works, you integrate it into the real page.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-vibe-quality',
          title: 'Quality Baselines',
          desc: 'Hard requirements for comments, debugging, and complete implementation',
          routes: ['pro', 'pm', 'build'],
          lessons: [
            { file: 'vibe-3b.html', title: "Style Convergence: Don't Ship Eight CSS Kits for One Button", desc: "Ask AI to ship ten features in a row, and you'll pile up eight button classes that look almost the same. It's not that it won't reuse — each new conversation has no idea what you already have. This lesson covers why styles proliferate, how to clean them up, and which differences should stay.", tag: 'Interactive' },
            { file: 'vibe-4.html', title: "Three Comment Elements and Code Protection", desc: "AI-generated comments mostly just restate what the code does. Come back three months later, and you can't remember why it was implemented that way. This lesson provides a structure for comments and establishes rules for \"deleting code\". The page includes two interactive demos.", tag: 'Interactive' },
            { file: 'vibe-5.html', title: "The Debugging Iron Rule: Log First, Then Fix", desc: "When AI hits an error, its first instinct is to guess a cause and try a fix, then guess another if it fails. This section establishes the most fundamental rule: no guesswork fixes. The two demos below let you compare the two bug-fixing paths hands-on.", tag: 'Interactive' },
            { file: 'vibe-6.html', title: "No Partial Deliveries", desc: "You ask for a complete authentication system, and AI says \"let's start with a simple username/password login first and add OAuth later.\" Later never comes. This lesson uses two demos to see the full lifecycle of \"ship a simple version first\" and practice the right way to respond.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-vibe-docs',
          title: 'Documentation & Persistence',
          desc: 'Making decisions survive beyond conversations and across time',
          routes: ['pro', 'pm', 'build'],
          lessons: [
            { file: 'vibe-7.html', title: "Three Documents & Methodology Capture", desc: "You ship 30 features, then three months later you want to know: \"When was this added? Why was it designed this way? How many times did the approach change?\" You can dig through git log all day and never find the answer. The solution is to have AI maintain three documents against strict templates, plus a methodology handbook that captures decisions automatically. Both demos on this page are interactive.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-vibe-env',
          title: 'Environment & Safety',
          desc: 'Hardcode environment facts; gate destructive operations',
          routes: ['pro', 'pm', 'build'],
          lessons: [
            { file: 'vibe-8.html', title: "Encode Environment Facts in Rules", desc: "Every time you start a new conversation, the AI has no idea which model to call, what timeout to use, or which framework the project uses. Hard-code these environment facts into Rules once — like giving AI a pre-filled .env reference sheet that gets injected automatically into every conversation. Both demos on this page are fully interactive.", tag: 'Interactive' },
            { file: 'vibe-9.html', title: "Three Safety Gates for Destructive Operations", desc: "During a release you think you only changed feature A, but the actual diff contains a temporary change from last week's debugging of feature B, and half-finished code makes it into production. Irreversible operations like database migrations, config changes, and deployments must have gates set before execution. Both exercises below are interactive.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-vibe-comm',
          title: 'Communication & Writing',
          desc: 'Fighting context drift and eliminating AI-sounding prose',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'vibe-10.html', title: "Long-Conversation Anchoring and Writing Standards", desc: "You said \"use PostgreSQL\" at turn 1. By turn 30, the AI suddenly suggests SQLite — because the early agreement has been pushed out of the context window. This lesson covers two things: how to fight context drift in long conversations, and how to eliminate the \"AI tone\" from AI-generated writing. Two interactive demos — drag and click to explore.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-vibe-final',
          title: 'Topic Wrap-Up',
          desc: 'Adapting these rules into your own',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'vibe-final.html', title: "The Value of Rules: Every Rule Solves a Real Problem", desc: "We've finished all 14 chapters. This ruleset has exactly one source: every time AI was found repeating the same mistake, a new rule was added. In this finale, we lay out the full panoramic map and use a self-audit wizard to help you adapt it as your own.", tag: 'Finale' },
          ],
        },
        {
          id: 't-build6',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can start doing today',
          routes: ['pro', 'pm', 'build'],
          lessons: [
            { file: 'build-6.html', title: "Last square: turn \"how you do it\" into \"anyone can do it\"", desc: "In the first five squares you built an Agent that can actually work — but all the judgment still lives in your head. This square writes that down as rules. Once they stand, a different person, a different project, a different model — the same system still runs. That's engineering, not craft.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-interview7',
          title: 'They Will Quiz You',
          desc: 'How interviewers, bosses, and tech colleagues will test you on this chapter',
          routes: ['pro', 'pm', 'build'],
          lessons: [
            { file: 'interview-7.html', title: "Vibe Coding Methodology · 30 Soul-Searching Questions", desc: "Nothing invites more skepticism than using AI to write code. These 30 questions come from three real-world scenarios — most from managers and dev colleagues. Try answering out loud first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p-taste',
      num: 'Special Topic',
      title: 'Taste Engineering: Getting AI to Make Things with Taste',
      desc: "Once the collaboration workflow holds, taste is the first thing that stops you. After AI knocks down the barrier to execution, anyone can make something usable in ten minutes — \"usable\" itself starts to devalue, and taste becomes the new dividing line. This chapter trains two skills: recognizing beauty, four handles (hierarchy, whitespace, restraint, consistency), each with an A/B spot-the-difference; and translating taste for AI — a taste vocabulary, prompts for generating UI and images, reference images and a reference library. Innate \"creating beauty\" can't be taught; \"seeing what's off\" and \"saying what you want\" can, if you practice.",
      color: '#db2777',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-taste-why',
          title: 'Taste Is the New Bottleneck',
          desc: 'Once execution is leveled, judgment starts getting expensive',
          lessons: [
            { file: 'taste-1.html', title: "Execution Is Free. Judgment Just Got Expensive", desc: "AI knocked down the barrier to shipping: anyone can make a usable page or a passable image in ten minutes. This Part doesn't teach you to draw. It teaches two skills you can practice: spot what's wrong, and say clearly what you want.", tag: 'Intro' },
            { file: 'taste-2.html', title: "Where the AI Look Comes From", desc: "Ask AI to whip up a page and nine times out of ten you get the purple-gradient, frosted-glass, centered-headline trio. That sameness has a mathematical reason—once you see it, you know how to dodge it.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-taste-eye',
          title: 'Four Handles for Recognizing Beauty',
          desc: 'Hierarchy, whitespace, restraint, consistency — each with a spot-the-difference',
          lessons: [
            { file: 'taste-3.html', title: "Hierarchy: One Hero per Screen", desc: "Open a page and the eye has to land somewhere first. If the designer doesn't place that landing spot, the reader's eyes bounce around on their own. This lesson is about hierarchy: how to use type size, weight, and color—three levers—to decide \"look here first.\"", tag: 'Interactive' },
            { file: 'taste-4.html', title: "Whitespace & Alignment: Most Ugliness Is Spacing", desc: "\"I can't say what's ugly—it just is.\" That review is about spacing eight times out of ten. Leave color and type alone; straighten spacing, and the UI jumps a tier. This lesson gives you two rules and a ready-made number table.", tag: 'Interactive' },
            { file: 'taste-5.html', title: "Restraint: Budget Your Colors and Type", desc: "Most good-looking interfaces aren't built by adding — they're saved by cutting. This lesson gives you a budget sheet: one primary plus neutrals, two font weights, one radius set. Anything over budget gets cut, no matter how pretty it looks.", tag: 'Interactive' },
            { file: 'taste-6.html', title: "Consistency: Where System Feel Comes From", desc: "Some UIs look fine piece by piece, yet feel cobbled-together as a whole. What they lack is one thing: a shared set of variables everyone follows. This lesson is about design tokens — variables first, styles follow.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-taste-speak',
          title: 'Translate Taste for AI',
          desc: 'Your taste vocabulary decides how good AI output gets',
          lessons: [
            { file: 'taste-7.html', title: "A Hundred Concrete Ways to Say \"Looks Good\"", desc: "Tell AI \"make it look better\" and it can only guess. Say \"raise information density one notch, cut visual noise\" and it knows exactly what to change. This lesson gives you twelve ready-to-use taste words, a set of eight variables that unpack every visual difference, plus a machine that translates complaints into terms.", tag: 'Interactive' },
            { file: 'taste-8.html', title: "Generating UI: From Adjectives to a Spec", desc: "When you brief AI on UI, adjectives are wishes and a spec is an instruction. Same landing-page request, three prompt tiers, three quality tiers of output. This lesson teaches you to write “looks good” as a spec AI can't wander from.", tag: 'Hands-on' },
            { file: 'taste-9.html', title: "Generating Images: The Language of Composition, Light and Shadow, Color", desc: "Generating images follows the same rule as generating UI: vocabulary sets the ceiling. The trio — composition, light and shadow, color — three words each. Train your eye on three real-image sets, then assemble an image prompt you can use right away.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-taste-library',
          title: 'Build Your Own Reference Library',
          desc: 'Learn to look, then get AI to ship from your references',
          lessons: [
            { file: 'taste-10.html', title: "What It Means to Really Look at Design", desc: "Your bookmarks grow; your eye doesn't. The problem is how you look. This lesson gives a fixed teardown order that turns \"nice\" into variables you can take with you—so your reference library starts compounding.", tag: 'Method' },
            { file: 'taste-11.html', title: "Feeding References to AI", desc: "Once you can see what's good, the next step is making AI know it too. This lesson covers three ways to feed references into the chat: reference images, style descriptions, and design variables—with prompt templates ready to copy.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-taste-final',
          title: 'Series Finale',
          desc: 'Before you sign off, run through the list',
          lessons: [
            { file: 'taste-final.html', title: "Acceptance Checklist: Run Through This Before You Sign Off", desc: "AI ships drafts faster; your gatekeeping has to keep up. This finale delivers a 15-item acceptance checklist, then revisits the vote you cast in the opener—see whether this chapter trained your eye.", tag: 'Finale' },
          ],
        },
      ],
    },
    {
      id: 'p-ixd',
      num: 'Special Topic',
      title: 'Interaction Engineering: Getting AI to Make Usable Things',
      desc: "Looks you can judge at a glance; usability you only know by using it — so interaction bugs hide deeper than taste bugs. AI's default interaction ships at the \"it runs\" level: blank empty states, errors that pop an alert, Delete with no confirm, five-step wizards that skip no step. This chapter continues from Taste Engineering: first learn to spot (the three states, error prevention and reversibility, flow restraint, conventions), then tighten interface details (which control to pick, how the copy should read), and finally translate interaction requirements for AI (goal-oriented requirements; put the state machine and boundaries in the prompt). Source material is drawn from the classic interaction-design textbook About Face 4.",
      color: '#2563eb',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-ixd-why',
          title: 'Usability Is Also the Bottleneck',
          desc: '"It runs" and "usable" are a whole chapter apart',
          lessons: [
            { file: 'ixd-1.html', title: "It Runs. Now What?", desc: "Last chapter trained you to spot「what's ugly」. This one trains「what's hard to use」. AI-shipped apps have every feature and respond to every click, but they feel rough everywhere. This lesson lays the chapter foundation: interaction bugs hide deeper than taste bugs. Then we take a theory checklist and catch five in the act.", tag: 'Intro' },
          ],
        },
        {
          id: 't-ixd-spot',
          title: 'Four Handles for Spotting Good Interaction',
          desc: 'States, error prevention, flow, conventions',
          lessons: [
            { file: 'ixd-2.html', title: "The Three States: Loading, Empty, Error", desc: "AI-generated UIs default to one state: data ready, network fine, everything normal. The first screen users meet is often one of the other three: no data, waiting, or broken. Those three abnormal moments are exactly where experience splits. This lesson unpacks the three states one by one, each with an A/B duel.", tag: 'Interactive' },
            { file: 'ixd-3.html', title: "Error Prevention & Reversibility: So Users Aren't Afraid to Click", desc: "Last lesson was how to word errors. This one steps earlier: stop errors from happening at all—and if they do, let users undo in one click. AI-built apps love confirm dialogs as insurance, but that's the weakest line of defense. Delete two contacts yourself and you'll see why.", tag: 'Interactive' },
            { file: 'ixd-4.html', title: "Flow Restraint: Every Extra Step Drops Another Batch", desc: "Last lesson tamed dangerous buttons. This one looks at the whole path: from entry to done, how many steps are serving the software instead of the user's job. AI-generated flows share a disease: they're too complete. Be a flow auditor for once—cut a five-step signup to two.", tag: 'Interactive' },
            { file: 'ixd-5.html', title: "Conventions: Don't Let AI Invent New Interactions", desc: "Once the flow is clean, a deeper disease remains: AI sometimes invents interactions that look novel and nobody can use. This lesson covers two words — conventions (idioms) and affordance. Finish it and you'll spot which control is faking innovation, and explain why users can't learn it.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-ixd-detail',
          title: 'Interface Details',
          desc: 'Which control to pick, how the copy should read',
          lessons: [
            { file: 'ixd-6.html', title: "Did You Pick the Right Control: Radio, Checkbox, Toggle & Dropdown", desc: "The first four lessons covered flow and states. This one drills into the smallest UI parts. Controls are the shared language between user and product — pick wrong, and users click once more and guess once more. Selection rules fit in four sentences. AI doesn't know them; you gatekeep.", tag: 'Interactive' },
            { file: 'ixd-7.html', title: "The UI Speaks: How Users Read Your Copy", desc: "Picking the right control isn't enough—the UI still has to talk. The two words on a button and the one line in a dialog are the entire conversation between product and user. Microcopy is half of interaction: get it right and users don't have to think; get it wrong and even standard controls are wasted. AI has one trick for microcopy: slap \"OK\" on everything.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-ixd-translate',
          title: 'Translating Interaction for AI',
          desc: 'Goal-oriented plus a state machine — then AI knows what you want',
          lessons: [
            { file: 'ixd-8.html', title: "Goal-Oriented: Describe Requirements by Goals, Not Feature Lists", desc: "The first seven lessons teach you to spot good interaction; these two teach you to translate requirements for AI. The first translation principle comes from the opening methodology of About Face 4: say who the user is and what they need to finish—let AI derive the features. Hand it a list and you get a counter; tell it a scenario and you get a tool.", tag: 'Hands-on' },
            { file: 'ixd-9.html', title: "Put the State Machine and Boundaries in the Prompt", desc: "Last lesson translated \"what you want\" into goals and scenarios. This one covers \"don't gloss over it.\" The rule is simple: AI only seriously writes the states you name; anything unnamed, it imagines as fair weather. So list every state, nail the edge cases, spell out error prevention—those three together are the interaction spec.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-ixd-final',
          title: 'Series Finale',
          desc: 'The second list before launch',
          lessons: [
            { file: 'ixd-final.html', title: "Interaction Acceptance Checklist: The Second List Before Launch", desc: "Taste Engineering's finale shipped the first list for \"looks good\"; this chapter ships the second for \"works well.\" Looks handle the first glance; usefulness handles every day after—and interaction bugs hide deeper: screenshots won't show them; you have to click. Fourteen items, one action each—run them before you sign off.", tag: 'Finale' },
          ],
        },
      ],
    },
    {
      id: 'p-psy',
      num: 'Special Topic',
      title: 'AI Product Psychology: Making Users Feel It Works Well',
      desc: 'Taste and interaction covered making it look good and making it usable. That leaves a third thing: making users feel it works well. AI products are slow, wrong, and opaque by nature, and engineering can only take the edge off those three in the short run—but what users think is decided by perception, and perception can be designed. This chapter lays out sixteen psychological effects along the user journey: waiting anxiety, the labor illusion, the peak-end rule, trust calibration, algorithm aversion, defensiveness, the honeymoon cliff, the AI label discount, cognitive offloading, emotional attachment, and on through the pain of paying, pricing anchors, and silence bias. Every lesson pairs one effect with a set of engineering switches you can flip on the spot.',
      color: '#0d9488',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-psy-perceive',
          title: 'Perceived Performance',
          desc: "The user's stopwatch and the server's stopwatch don't tick the same",
          lessons: [
            { file: 'psy-1.html', title: "Engineering metrics pass. Why do users still call it slow?", desc: "Earlier chapters taught you to cut latency, squeeze cost, and drive hallucination rates down. This chapter swaps the stopwatch: the one in the user's head. It ticks differently from the server's. Ratings, renewals, and uninstalls all follow it. Lesson one runs an experiment, then unpacks this watch's timing quirks one by one.", tag: 'Intro' },
          ],
        },
        {
          id: 't-psy-wait',
          title: 'Waiting and Process Design',
          desc: 'What hurts was never really those 5 seconds',
          lessons: [
            { file: 'psy-2.html', title: "The Psychology of Waiting: It Was Never Really About Those 5 Seconds", desc: "In lesson 1 you measured it yourself: the same 5 seconds can feel two or three times longer. This lesson digs into the rules behind that. Service-operations research distilled queue psychology into a few laws, and every one of them maps to an AI product design decision. Once you've done that mapping, you'll see: most “too slow” complaints are really about presentation—you don't have to touch the model at all.", tag: 'Interactive' },
            { file: 'psy-3.html', title: "Labor Illusion: Make AI Show Its Work", desc: "Lesson 2 said waiting needs feedback. This lesson’s takeaway is more counterintuitive: some waiting shouldn’t be eliminated at all. Products that show their work make users wait a few extra seconds—and satisfaction and trust go up. The effect is called the labor illusion. Run the experiments first, then the research, then draw the boundaries.", tag: 'Interactive' },
            { file: 'psy-4.html', title: "Peak-End Rule: Users Only Remember the Peak and the End", desc: "Nobel laureate Kahneman found that how people remember an experience is almost entirely set by the most intense moment (the peak) and the final moment (the end) — average level and duration barely matter. This rule answers a budget question directly: where in a session should you spend the most expensive model and the most optimization effort. This lesson has five experiments — play them one by one.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-psy-trust',
          title: 'Trust and Defense',
          desc: "You can't trust it fully—and you can't afford not to use it",
          lessons: [
            { file: 'psy-5.html', title: "Trust Calibration: The Best Users Are Half-Skeptical", desc: "The first four lessons scored points for experience. This one hits the brakes: for trust as a metric, the target was never a perfect score. AI will err—that’s an unfixable physical fact—so a healthy user looks like this: use it freely where it’s safe to trust, keep a wary eye where you should check. Drift either way and you pay tuition.", tag: 'Interactive' },
            { file: 'psy-9.html', title: "Algorithm Aversion: One Mistake and the AI Gets Permanently Blocked", desc: "Last lesson was about calibrating trust. This one is about the biggest rock on that road: people’s tolerance for AI mistakes is far lower than for human ones. Same single error—a human colleague gets forgiven; the AI gets abandoned. The asymmetry has experiments, data, and an antidote.", tag: 'Interactive' },
            { file: 'psy-6.html', title: "Defensiveness: Users Aren’t Unable — They’re Afraid to Use It", desc: "When AI features sit unused, postmortems often blame “not enough user education,” ship another onboarding modal, and still nobody uses them. The real reason is often defensiveness: they understood your feature — then decided not to touch it.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-psy-mind',
          title: 'Mental Models and Anthropomorphism',
          desc: "Users brought the wrong manual—don't blame the users",
          lessons: [
            { file: 'psy-7.html', title: "Mental Models: Users Brought the Wrong Manual", desc: "Interaction design has an old idea called the mental model: users arrive with assumptions about “how this thing should work.” Wrong assumptions mean wrong actions—then the one-star review lands on the product, and the bill lands on you. AI is the first thing in human history that “looks like an old product but runs on a different core,” so mismatches hit especially hard.", tag: 'Interactive' },
            { file: 'psy-8.html', title: "How Far to Anthropomorphize, and the Art of AI Apology", desc: "In the 1990s, Stanford’s Reeves and Nass reported a counterintuitive set of experiments in The Media Equation: people politely thank computers, light up when a computer compliments them, and apply social rules even knowing it’s a machine. That’s the CASA paradigm (Computers Are Social Actors).", tag: 'Interactive' },
          ],
        },
        {
          id: 't-psy-longterm',
          title: 'Long-term Use',
          desc: "The honeymoon ends—that's when the relationship starts",
          lessons: [
            { file: 'psy-10.html', title: "Honeymoon Cliff: Hype Raises Expectation—Retention Pays It Back", desc: "Keynote demos look miraculous; day one is thrilling; day three starts nitpicking; day thirty, uninstall. You’ve seen this curve on countless AI products. Two causes: hype pulls expectation up, and novelty fades on its own. Both can be designed.", tag: 'Interactive' },
            { file: 'psy-11.html', title: "AI Label Discount: Same Content, Mark It AI and It Drops in Value", desc: "Content unchanged—add four words, “AI-generated,” and ratings drop a notch. The tool is great, yet users don’t want colleagues to know they use it. Same bias, two faces. Building AI products, when the label must show and when you’re docking your own score is a question you answer every day.", tag: 'Interactive' },
            { file: 'psy-12.html', title: "Cognitive Offloading: Users Rely on You—and Fear Going Rusty", desc: "Among your power users sit a contradictory bunch: without your product they can’t get work done, yet they quietly sense they’re going rusty. That anxiety never shows up in NPS comments—but it decides renewals, referrals, and whether one day they suddenly “quit” you. The anxiety has a name—cognitive offloading—and product design can catch it.", tag: 'Interactive' },
            { file: 'psy-13.html', title: "Emotional Attachment: After Users Fall in Love with Your Product", desc: "The anthropomorphism lesson covered how people instinctively treat machines as social actors. This lesson goes deeper: users form real emotional attachment to AI. It delivers the strongest retention curve—and the heaviest responsibility in a PM’s career. This is not a companion-product-only topic; any product with a chat box cannot dodge it.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-psy-money',
          title: 'Paying and Pricing',
          desc: 'Getting paid is psychology design too',
          lessons: [
            { file: 'psy-14.html', title: "The Psychology of Paying: Where It Hurts to Pay for a Probabilistic Good", desc: "AI is a strange good: same money paid, this generation dazzles, the next flops—and cost ticks by token somewhere you never see. Every yuan in the user’s pocket is wired to a nerve. How you charge decides how much it hurts to pay. This lesson is the psychology side of paying; the next lesson is the numbers side of pricing.", tag: 'Interactive' },
            { file: 'psy-15.html', title: "The Psychology of Pricing: Anchors, Decoys, and Decent Price Discrimination", desc: "The previous lesson covered how to charge without pain; this one covers how much. First remember a counterintuitive fact: users have no objective sense of price—every judgment comes from a reference. References can be arranged; this craft is a century old, and AI products just got a tool unique to them.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-psy-feedback',
          title: 'Feedback Design',
          desc: 'How bad news can actually get heard',
          lessons: [
            { file: 'psy-16.html', title: "The Psychology of Feedback: Why Users Don’t Thumbs-Down", desc: "You put 👍 and 👎 next to answers, hoping users will label data for you. A month later: thumbs-down rate 0.4%, but churn is climbing. It isn’t that the product is fine—unhappy users don’t thumbs-down; they just leave. This lesson covers the psychological cost of feedback, and how to hear users without waiting for them to speak.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-psy-books',
          title: 'Further Reading',
          desc: 'Every pattern in this chapter has a source',
          lessons: [
            { file: 'psy-books.html', title: "Nine Books to Thicken This Chapter", desc: "Every conclusion in this chapter has a source—the lessons only gave you the compressed cut. This section puts the originals on the shelf: nine books unpack nineteen psychology principles every PM needs, each tagged with its AI product application. Don’t grind them in order—start with the problem that hurts most right now.", tag: 'Reading List' },
          ],
        },
        {
          id: 't-psy-final',
          title: 'Series Finale',
          desc: 'Sixteen effects on one comparison table',
          lessons: [
            { file: 'psy-final.html', title: "Sixteen Effects on One Table, Plus Fourteen Pre-Launch Questions", desc: "Every psychological effect in this chapter maps to an engineering switch you already learned. The finale lays them out in one table, then hands you a checklist you can paste straight into the launch process. Psychology isn’t mystical: it just turns “why users react this way” from guesswork into pattern.", tag: 'Finale' },
          ],
        },
        {
          id: 't-psy-interview',
          title: 'How They Will Test You',
          desc: 'How interviewers, bosses, and tech colleagues will test this chapter',
          lessons: [
            { file: 'psy-interview.html', title: "AI Product Psychology · 40 Soul-Searching Questions", desc: "You've finished the Psychology chapter—can you turn “why users react this way” into an executable plan? One question tells you. These 40 questions come from three real scenarios: answer out loud first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p-cost',
      num: 'Special Topic',
      title: 'Token Cost Engineering: Cost Engineering for AI Apps',
      desc: "Explore token measurement, price boundaries, context design and cost optimization with teaching examples. Check actual prices against your current service configuration.",
      color: '#16a34a',
      group: 'indie',
      cluster: 'chain',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-cost-why',
          title: 'Pricing Is Architecture',
          desc: 'Cost makeup, how Tokens are counted, how to read a price sheet',
          lessons: [
            { file: 'cost-1.html', title: "A Business That Bets Against Its Users", desc: "Ever feel this? We always want better AI for users—but commercially, you're betting against them: the better the product, the more they use it, the thinner your margins. Looking at the usage bill, do you ever feel that bill-shock moment?", tag: 'Intro' },
            { file: 'cost-2.html', title: "How Tokens Are Counted: BPE and the Hidden “Token Tax”", desc: "Bills settle in Tokens—but how are Tokens counted? They're neither characters nor words, but “subwords” built from statistical patterns. Once you get the rules, you'll see why the same sentence in Chinese is inherently ~2× more expensive than in English.", tag: 'Interactive' },
            { file: 'cost-3.html', title: "Price Sheet at a Glance and the Three Tiers", desc: "Spread the prices of the models you use onto one table and three clear tiers jump out. But knowing which is expensive and which is cheap is nowhere near enough—the real cost assassins hide in the price-jump boundaries.", tag: 'Selection' },
          ],
        },
        {
          id: 't-cost-cliff',
          title: 'Three Tier-Jump Traps',
          desc: 'Cost assassins hiding in the price-jump boundaries',
          lessons: [
            { file: 'cost-4.html', title: "GLM's Short-Output Game: the 200-Token Cliff", desc: "Look at GLM-4.6's pricing structure and you'll spot a clever design: it doesn't tier by input length—it tiers by output length, with the boundary at 200 Tokens. Output 199 vs output 201: completely different prices.", tag: 'Interactive' },
            { file: 'cost-5.html', title: "Qwen's Tier Escape: the 32k Red Line", desc: "Qwen's tiering logic is the opposite of Zhipu's: bill by input length, with boundaries at 32k and 128k. The detail people miss—crossing the line doesn't surcharge the overflow; it bills the whole request at the higher tier.", tag: 'Interactive' },
            { file: 'cost-6.html', title: "Image Tokens: Pixels Pay Tax Too", desc: "Text BPE “merges characters”; image encoding “cuts pixels.” You think you're sending the original—models bill the resolution after scale-and-align. Inside sits the same tier-jump trap as the text 32k red line.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-cost-agent',
          title: 'The Agent Bill',
          desc: 'Looping execution makes cost balloon',
          lessons: [
            { file: 'cost-7.html', title: "Input-Dominated: a 62:1 I/O Ratio", desc: "A plain chatbot is one question, one answer; an Agent is a “think → act → observe → think again” loop. The key idea: every turn's Input includes the full history—more turns means longer Input and ballooning cost.", tag: 'Interactive' },
            { file: 'cost-8.html', title: "Four Agent Cost Traps and the Circuit Breaker", desc: "Last lesson was still “one successful run.” In the real world, Agent bill accidents come from four directions: tool-return explosion, thinking tax, infinite loops, and history snowball. Each has an engineering fix.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-cost-practice',
          title: 'Four-Layer Hands-on Optimization',
          desc: 'Syntax, semantics, architecture, output—peel cost down layer by layer',
          lessons: [
            { file: 'cost-9.html', title: "Syntax Layer: Prompts Are Written for Machines", desc: "First of the four hands-on layers. Early products often keep ###, bold **, and pretty JSON—either for debugging or because an AI drafted the prompt. Layout that feels friendly to humans is “lexical tax” in an LLM's billing logic.", tag: 'Hands-on' },
            { file: 'cost-10.html', title: "Semantic Layer: Double Distillation", desc: "Format tax is cut. Next look at the content itself. The most common engineering mistake in RAG and long-document work: treat the context window as a dump—stuff every Few-Shot example and retrieved doc in, and hope the model sorts it out. It works. It shouldn't.", tag: 'Hands-on' },
            { file: 'cost-11.html', title: "Architecture Layer: KV Cache Caveats", desc: "In commercial cost engineering, KV Cache is one of the most underrated levers. Hit vs miss can mean up to 90% cost difference—but a few invisible traps sit inside. You might never hear them until someone tells you.", tag: 'Hands-on' },
            { file: 'cost-12.html', title: "Output Layer: Keep the Model's Mouth Shut", desc: "Last of the four hands-on layers. Output Tokens cost several times more than input (look back at Lesson 3's price sheet), and they directly set API return speed. Three kinds of moves keep the model's mouth shut: instruction layer, code layer, engineering layer.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-cost-final',
          title: 'Series Finale',
          desc: 'Where saving money ends: information density',
          lessons: [
            { file: 'cost-final.html', title: "Minimalism in the Age of Compute", desc: "After these layers of optimization, you've already beaten about 90% of rough-cut AI products. This finale stitches the whole series into one checklist—and talks about the more important thing behind “saving money.”", tag: 'Finale' },
          ],
        },
      ],
    },
    {
      id: 'p-ds',
      num: 'Programming Fundamentals',
      title: 'Data Structures: The Skeleton of the AI World',
      desc: "No memorizing definitions, no hand-writing linked lists. Using AI concepts you already know as the examples—a message list is an array, KV Cache is a cache, RAG retrieval is nearest-neighbor search—you'll get all eight core data structures in one pass. By the end you can tell what structures AI-generated code is using, and what's inside a large model's belly.",
      color: '#0284c7',
      group: 'indie',
      cluster: 'hardcore',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-ds-why',
          title: 'Why It Still Matters in the AI Era',
          desc: "You don't have to write code—but you do need to check the code AI writes",
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'ds-1.html', title: "It's 2026 — Why Still Learn Data Structures?", desc: "AI can write code now — do you still need this “programmer staple”? Bottom line first: you don't have to write the code, but you do need to check what AI writes. This chapter won't make you memorize definitions or hand-code linked lists — it gives you glasses that can see through code. Lesson one starts with a game.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-ds-linear',
          title: 'Linear Structures: You Use Them Every Day',
          desc: 'Arrays, stacks, queues—the foundation of AI chats and Agent scheduling',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'ds-2.html', title: "Arrays: Every Message You Chat Lies in One", desc: "Last lesson we locked it in: a data structure = a way of organizing. The first way of organizing is one you feed data into every day — every exchange you have with an AI is, to a program, a message list, and a message list's real form is the plainest way of organizing: a row of numbered cells, called an array.", tag: 'Interactive' },
            { file: 'ds-3.html', title: "Stacks: The Secret Behind Cmd+Z and Stack Overflow", desc: "The second way of organizing looks like a stack of plates: you can only put on from the top, and only take from the top — that's a stack. Sounds very limiting? But the undo key you hit every day, and every function call in a program, both rely on it.", tag: 'Interactive' },
            { file: 'ds-4.html', title: "Queues: An Agent's Work Gets Done in Line", desc: "Last lesson's stack was “last in, first out.” This one flips the direction: first in, first out—in one end, out the other, like the lunch line at a cafeteria. Don't dismiss it for looking plain: AI services that survive ten thousand questions at once, and Agents that finish a string of tasks in order, both rely on this line. Today you're the dispatcher: start a pipeline yourself, push it into backlog, then save it.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-ds-hash',
          title: 'Hashing & Caching: Space for Time',
          desc: 'Fast lookups and lower bills—same move underneath',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'ds-5.html', title: "Hash Tables: Why Lookups Are Unreasonably Fast", desc: "Remember the foreshadowing in lesson one? Version B of “check the member list” used one line set.has(user)—list from 100 to 10 million people, time barely moved. We promised to unmask it in lesson five—today we take that “direct hit” magic apart: it doesn't scan; it computes.", tag: 'Interactive' },
            { file: 'ds-6.html', title: "Caches: The Invisible Discount on Your AI Bill", desc: "Last lesson's hash table solved “how to find instantly.” This one solves another: don't compute the same thing twice. The “cache hit half-price or even 90% off” on model price sheets—every cent saved on the bill—is the same way of organizing: store results you've computed, fetch next time.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-ds-tree',
          title: "Trees & Graphs: AI's Home Turf",
          desc: 'The world as Coding Agents and knowledge graphs see it',
          routes: ['build'],
          lessons: [
            { file: 'ds-7.html', title: "Trees: All a Coding Agent Sees", desc: "Earlier lessons organized things in “rows.” This one flips the dimension: nesting layer inside layer. Drawers hold boxes, boxes hold bags—that hierarchy + containment is what programmers call a tree. And when a Coding Agent looks up, your project is trees all the way down.", tag: 'Interactive' },
            { file: 'ds-8.html', title: "Graphs: From Knowledge Graphs to Multi-Agent Collaboration", desc: "Last lesson’s trees were well-behaved: one parent each, never a cycle. Real-world relations are messier—friends are friends with each other; companies, schools, and people tangle. Tear up “one parent only,” and a tree upgrades to a graph: nodes + relations, wire them however you like. This lesson covers graph’s two home turfs in AI.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-ds-llm',
          title: 'Data Structures Inside the LLM',
          desc: 'Setups planted in earlier chapters—payoff here',
          routes: ['pro', 'pm', 'build'],
          lessons: [
            { file: 'ds-9.html', title: "Vocabulary & Trie: How Tokenizers Cut Words", desc: "Remember that detail from LLM fundamentals—the tokenizer cuts “五花肉” into one whole token, not three characters. We said “common combos stay whole”; now the underbelly: how does a tokenizer spot, among tens of thousands of words, that “五花肉” should leave as one chunk? The answer is a way of organizing called a Trie (prefix tree)—hang the vocabulary by shared prefixes into a tree.", tag: 'Interactive' },
            { file: 'ds-10.html', title: "Vectors: RAG Retrieval Is Finding Nearest Neighbors", desc: "When we learned RAG, we said Embedding turns a passage into a string of numbers. What are those numbers, really? The answer is almost too simple—coordinates. Each sentence gets a spot on a “semantic map”: closer in meaning means closer in place. So “retrieving documents” becomes a game every kid knows: find the neighbors closest to you on the map.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-ds-summary',
          title: 'Part Summary',
          desc: 'A recap of the core ideas in the Data Structures part',
          routes: ['build'],
          lessons: [
            { file: 'ds-summary.html', title: "Recap · Eight Structures, One Decision Table", desc: "Ten lessons done—all eight ways of organizing laid bare. This page adds nothing new. One job only: put them on the same table so later you can name the structure the moment you see the scenario. Scan the decision table, then play the picker and quick quiz to check whether you can really review AI-written code.", tag: 'Recap' },
          ],
        },
        {
          id: 't-ds-build',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can actually put your hands on today',
          routes: ['build'],
          lessons: [
            { file: 'ds-build.html', title: "Check AI-Written Code Once Through", desc: "The whole chapter said “you don’t have to write code, but you do need to check it”—today you actually check something real. Three tiers by how much time you’ll put in: the lightest one takes 30 minutes; in a week you can turn checking into a work habit. Every tier ships with a ready-to-use prompt.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-ds-interview',
          title: 'How They Will Test You',
          desc: 'How interviewers, bosses, and tech colleagues will test this chapter',
          routes: ['build'],
          lessons: [
            { file: 'ds-interview.html', title: "Data Structures · 30 Tough Questions", desc: "You finished the Data Structures part—has the organizing intuition stuck? One ask tells. These 30 questions come from three real scenes: answer out loud first, then look at the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p-algo',
      num: 'Programming Fundamentals',
      title: 'Algorithms: How AI Thinks',
      desc: 'Starting from the gut feel for "how long will this code run," this chapter works through five classic families—complexity, search and sort, recursion and divide and conquer, graph search, and greedy sampling—each mapped to a real mechanism inside a large model: attention is O(n²), Rerank is sorting, Compaction is divide and conquer, decoding is greedy plus sampling. It closes with the ultimate question: now that AI can solve the problems, should you still grind LeetCode?',
      color: '#db2777',
      group: 'indie',
      cluster: 'hardcore',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-algo-bigo',
          title: 'Complexity: Is This Code Worth It?',
          desc: "No math needed—build an intuition for what's fast and what's slow",
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'algo-1.html', title: "Big-O: See at a Glance How Long Code Will Run", desc: "The sister part covered “data structure = how you store things.” This chapter covers the other half: algorithm = a playbook for getting work done. To judge whether a playbook is any good, programmers share one ruler: Big-O. Don't let the math symbols scare you—it answers only one question: when the data grows, how much slower does your code get? Today, three interactives will install that ruler in your head.", tag: 'Interactive' },
            { file: 'algo-2.html', title: "Why Longer Context Costs More: The O(n²) Bill", desc: "Last lesson you got the Big-O ruler—remember that red line taking off? Today we look at the most famous O(n²) inside LLMs—the attention mechanism. You'll suddenly get a pile of old questions: why long chats get slower, why the context window is a “window” not a “warehouse,” why everyone hustles on context compression.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-algo-sort',
          title: 'Search and Sorting',
          desc: "The art of cutting in half—and sorting's real face in AI",
          routes: ['build'],
          lessons: [
            { file: 'algo-3.html', title: "Binary Search: The Optimal Number-Guessing Game", desc: "That easy green line O(log n) from last lesson—today we unmask it. Did you play “I'm thinking of a number from 1 to 100, you guess” as a kid? The optimal strategy for guessing numbers is one of the classic algorithms in computer science—binary search. Play first, then talk theory.", tag: 'Interactive' },
            { file: 'algo-4.html', title: "Sorting: Bubble Sort vs Quicksort Race", desc: "Last lesson said the ticket for binary search is “sort first.” So is sorting itself expensive? Depends on the playbook. Today’s an open race: same shuffled data, bubble sort and quicksort start together—whoever lines the bars short-to-tall first wins. Start small, then try 60 bars—the gap will stick with you.", tag: 'Animation' },
            { file: 'algo-5.html', title: "Sorting's Real Face in AI: Rerank", desc: "Last lesson’s sort compared number size; in the AI world we rank “relevance”: RAG scoops a pile of passages from the knowledge base, and whoever ranks first squeezes into context—rank wrong, and the model will solemnly cite the wrong material. That “score + re-rank” step is Rerank. Today you’re on the job: play Rerank yourself.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-algo-recur',
          title: 'Recursion and Divide-and-Conquer',
          desc: 'Break a big job into the same smaller job',
          routes: ['build'],
          lessons: [
            { file: 'algo-6.html', title: "Recursion: Break a Big Job into the Same Smaller Job", desc: "“Build a website” sounds scary; “write three lines of home-page copy” anyone can do. In the Engineering Advanced Part you saw a Coding Agent take a big ask and list small tasks on its own—that idea has a name: recursion. This lesson writes zero lines of code. Click a task tree, drag a slider, and you’ll own the word programmers make sound mystical.", tag: 'Interactive' },
            { file: 'algo-7.html', title: "Divide and Conquer: The Algorithm Behind Context Compression", desc: "In the AI Practicum you learned: when a chat is too long to fit, the AI runs Compaction—compressing old turns into a summary. We said it was “like packing clutter before a move.” This lesson peels back the wrapping: it’s a two-thousand-year-old algorithm pattern called divide and conquer. Last lesson’s recursion was “split”; this one adds the other half: “split, then merge.”", tag: 'Interactive' },
          ],
        },
        {
          id: 't-algo-search',
          title: 'Search and Decision',
          desc: 'Walk a maze, roll the dice, look a few steps ahead',
          routes: ['build'],
          lessons: [
            { file: 'algo-8.html', title: "BFS and DFS: How an Agent Finds Files in a Codebase", desc: "In the Engineering Advanced Part, a Coding Agent asked to “find why login fails” rummages through hundreds of folders. Where first—finish this layer then go deeper, or grab one clue and drill all the way? Two very different personalities: BFS (breadth-first) and DFS (depth-first). This lesson sends each through the same maze—you’ll see the personality at a glance.", tag: 'Interactive' },
            { file: 'algo-9.html', title: "Greedy and Sampling: Two Personalities When AI Picks Words", desc: "In the LLM Fundamentals Part you saw the candidate probability bars in an AI’s head as it continues token by token, and you twiddled Temperature. That was “feel”; this lesson names the algorithms: always pick the biggest = greedy; roll dice by probability = sampling. Same starter, each personality generates three times—you’ll see the difference at a glance.", tag: 'Interactive' },
            { file: 'algo-10.html', title: "Beam Search: Look a Few Steps Ahead Before Choosing", desc: "Last lesson left a trap: greedy always grabs the biggest option in front of it, so one misstep can ruin the whole path. The fix is almost cutely simple—don’t lock in yet; keep several candidate paths walking forward together, then compare total scores at the end. That’s Beam Search. The word lattice below puts three strategies on the same stage.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-algo-learn',
          title: 'Learning Algorithms in the AI Era',
          desc: 'Whether you still need to grind problems—and how to learn with AI',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'algo-11.html', title: "AI Can Solve the Problems—Do You Still Need LeetCode?", desc: "This is the question the whole chapter gets asked the most. The answer isn’t a simple yes or no—it differs a lot by role. No pep talk this lesson: honest talk on the 2026 interview market—which roles still test algorithms, how hard, and which stopped caring. Find your seat first.", tag: 'Interactive' },
            { file: 'algo-12.html', title: "The Right Way to Learn Algorithms with AI", desc: "Last lesson said it’s still worth learning; this one answers how to learn fastest. The key move is flipping the roles: you set the work and it gatekeeps—not it performs while you spectate. Three prompt templates you can take as-is, then 5 comparison quizzes to calibrate your approach.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-algo-summary',
          title: 'Part Summary',
          desc: 'A recap of the core ideas in the Algorithms Part',
          routes: ['build'],
          lessons: [
            { file: 'algo-summary.html', title: "Summary · Five Algorithm Ideas at a Glance", desc: "Twelve lessons done—time to close the net. This chapter really only taught five kinds of ideas, and each has a real face in AI. This page takes the whole chapter home in one big table, then uses 8 scenario questions to test whether you can “spot it at a glance”—see a problem and know which idea to reach for.", tag: 'Recap' },
          ],
        },
        {
          id: 't-algo-build',
          title: 'What You Can Do Now',
          desc: 'After this chapter, what you can put your hands on today',
          routes: ['build'],
          lessons: [
            { file: 'algo-build.html', title: "Run a Complexity Checkup on AI-Written Code", desc: "The Algorithms Part finale: take a real piece of AI-written code through a full checkup—self-report → optimize → measure. Pick one of three tiers by how much time you’ll put in; 30 minutes to start. Reach tier three and you’ll see with your own eyes whether the complexity AI claimed was bluffing.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-algo-interview',
          title: 'How They Will Test You',
          desc: 'How interviewers, bosses, and tech colleagues will test this chapter',
          routes: ['build'],
          lessons: [
            { file: 'algo-interview.html', title: "Algorithms · 30 Must-Answer Questions", desc: "You've finished the Algorithms Part—has the complexity intuition stuck? One question tells you. These 30 questions come from three real scenarios: answer out loud first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p6',
      num: 'Part 6',
      title: 'Dissecting Grok Build: A Production Coding Agent in Rust',
      desc: 'Based on xAI\'s open-sourced Grok Build Rust codebase — examining the runtime, tools, memory, security, and extensibility design across 79 Workspace members.',
      color: '#f59e0b',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],
      hardcore: true,
      topics: [
        {
          id: 't-grok-map',
          title: 'System Map',
          desc: 'Layered architecture of 79 Workspace members and the Rust technology choice',
          lessons: [
            { file: '12-1.html', title: "How 79 Workspace Members Form a Product", desc: "The root Cargo.toml lists 79 members, of which crates/codegen/ accounts for 62. To understand this system, read along five main axes: composition entry, interaction layer, Agent host, domain capabilities, and inference state.", tag: 'Architecture' },
            { file: '12-2.html', title: "Why Rust Makes Sense: Separating Facts from Inferences", desc: "The source code verifies Rust 2024, Tokio, strong-type modeling, and native binary artifacts. Organizational motivations behind technology choices are not written into the source — this lesson offers only bounded course inferences.", tag: 'Concept' },
            { file: '12-3.html', title: "From Real main() to First Sampling Round", desc: "The actual entry point is xai-grok-pager-bin/src/main.rs. A single composite entry parses commands and interaction modes, then delegates to the TUI or Shell Agent host.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-grok-core',
          title: 'Agent Core Loop',
          desc: 'Session Actor, Compaction, and System Prompt',
          lessons: [
            { file: '12-4.html', title: "Session Actor: Thread, State & Cancellation Boundaries", desc: "Each Session runs a current-thread Tokio runtime and LocalSet on a dedicated OS thread. SessionActor coordinates turns, ChatStateActor serially owns the conversation state, and CancellationToken handles cooperative termination.", tag: 'Deep Dive' },
            { file: '12-5.html', title: "Compaction: 85% Threshold and Optional Two-Pass", desc: "The default policy allows auto-compaction when context usage reaches 85%. Both memory flush and two-pass are disabled by default; they must be explicitly enabled to activate their respective flows.", tag: 'Interactive' },
            { file: '12-6.html', title: "PromptContext: Inspectable Rendering Input", desc: "PromptContext stores Agent-specific template inputs. It gains serialization capability via Serde derive, then is passed to ToolBridge::render_prompt() for rendering.", tag: 'Concept' },
          ],
        },
        {
          id: 't-grok-tools',
          title: 'Tool System',
          desc: 'Registry, taxonomy, and built-in tool sets',
          lessons: [
            { file: '12-7.html', title: "Process-Level External Toolset Preset Registry", desc: "config.rs allows extension code outside the crate to register name-resolved toolset builder functions within the current process, using Public and Internal visibility to control inclusion in the public enumeration.", tag: 'Architecture' },
            { file: '12-8.html', title: "ToolKind Provides Default Read-Only Semantics", desc: "is_read_only() is the default classification at the tool-kind layer. Individual tools can override it, and whether a tool ultimately executes still depends on rules, sandboxes, Hooks, and interactive approval.", tag: 'Design Pattern' },
            { file: '12-9.html', title: "Implementation Families, Registry, and Dynamic MCP", desc: "xai-grok-tools houses multiple sets of built-in tool implementations alongside runtime MCP tools. ToolBridge connects the registry to the session layer, while SearchTool and UseTool provide the discovery and invocation entry points.", tag: 'Deep Dive' },
            { file: '12-10.html', title: "Canonical Input Is a Stable Projection", desc: "Different harnesses can use different raw parameter names. Grok Build projects a small set of stable semantics into x.ai/tool metadata, giving presentation, telemetry, and cross-tool analysis a shared vocabulary.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-grok-memory',
          title: 'Context & Memory',
          desc: 'Token estimation, hybrid retrieval, and the Dream mechanism',
          lessons: [
            { file: '12-11.html', title: "Estimation, Percentage, and Strict Thresholds", desc: "xai-token-estimation provides shared arithmetic primitives. It offers both a local rough estimate via bytes/4 and usage-rate plus threshold checks based on caller-supplied used and total values.", tag: 'Interactive' },
            { file: '12-12.html', title: "From File Changes to Hybrid Ranking", desc: "Sync dirty files before querying, then combine FTS5 BM25 with optional sqlite-vec KNN. Merged scores are adjusted by time decay, source weight, and access boost; MMR diversity re-ranking is optionally enabled at the end.", tag: 'Deep Dive' },
            { file: '12-13.html', title: "The Real Mechanism of Dream", desc: "Dream merges recent session logs with the existing MEMORY.md to form long-term memory. It is triggered by session end, optional periodic checks, or a manual command, and is constrained by both gating and a best-effort lock.", tag: 'Frontier' },
          ],
        },
        {
          id: 't-grok-subagent',
          title: 'Sub-Agent & Multi-Agent',
          desc: 'Agent Definition + Persona overlay: a two-layer system',
          lessons: [
            { file: '12-14.html', title: "How AgentDefinition and Persona Merge", desc: "A sub-agent first resolves its executable skeleton, then folds spawn parameters, role defaults, and Persona defaults into a runtime configuration. The two structures take effect at different stages and together determine the child session.", tag: 'Design Pattern' },
            { file: '12-15.html', title: "Four Isolation Dimensions of Sub-Agents", desc: "Context source, identity continuity, working directory, and file change scope each control different boundaries. Conflating them into a single \"isolation level\" easily leads to misreading the true behavior of resumption and worktrees.", tag: 'Deep Dive' },
            { file: '12-16.html', title: "How to Organize Multi-Agent Systems", desc: "A multi-Agent system must simultaneously address role definition, spawn, state querying, cancellation, completion notification, and resource inheritance. Grok Build's source code distributes these responsibilities across a definition layer and a coordination event layer.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-grok-security',
          title: 'Permissions, Sandbox & Security',
          desc: 'Kernel-level sandboxing, permission evolution, and Hooks interception',
          lessons: [
            { file: '12-17.html', title: "Five Sandbox Profiles", desc: "workspace, devbox, read-only, strict, and off define different capability sets for the filesystem and subprocess networking. Names give direction; the actual boundaries require examining the resolved capability set.", tag: 'Security' },
            { file: '12-18.html', title: "From Tool Request to Restricted Execution: The Complete Authorization Chain", desc: "A single tool call is first parsed into a concrete access intent, then passes through the plan gate, hooks, policy rules, session authorization, Auto mode, and user confirmation. Once execution is permitted, the sandbox further constrains OS-level capabilities.", tag: 'Security' },
            { file: '12-19.html', title: "Hooks: Explicit Deny to Block", desc: "Grok Build Source Course Lesson 19: Hook events, matchers, blocking semantics, and fail-open boundaries.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-grok-eco',
          title: 'MCP & Ecosystem',
          desc: 'MCP client, OAuth, connection recovery, and plugin trust',
          lessons: [
            { file: '12-20.html', title: "MCP: Connection Is Just the Beginning", desc: "Grok Build Source Course Lesson 20: MCP client, OAuth, tool visibility, and connection recovery", tag: 'Deep Dive' },
            { file: '12-21.html', title: "Marketplace：Discovery, Installation, and Execution Layers", desc: "Grok Build Source Course, Lesson 21: Plugin Marketplace, plugin discovery, and trust boundaries", tag: 'Architecture' },
          ],
        },
        {
          id: 't-grok-beyond',
          title: 'Beyond the Source',
          desc: 'Complete comparison, lessons learned, and design inspiration',
          lessons: [
            { file: '12-22.html', title: "Full Comparison: Calibrate Evidence Before Trade-offs", desc: "Complete side-by-side comparison of Grok Build and Claude Code: layered analysis with source evidence and public product behavior.", tag: 'Recap' },
            { file: '12-23.html', title: "Engineering Retrospective: Capabilities and Boundaries, Read Together", desc: "Grok Build Source Course Lesson 23: Engineering retrospective and applicable boundaries based on source code and README.", tag: 'Finale' },
            { file: '12-24.html', title: "Coding Agent Design Workbench", desc: "Coding Agent Design Workbench: nine system dimensions and submittable capstone deliverables", tag: 'Finale' },
          ],
        },
        {
          id: 't-interview6',
          title: 'They Will Quiz You',
          desc: 'How interviewers, bosses, and tech colleagues will test you on this chapter',
          lessons: [
            { file: 'interview-6.html', title: "Dissecting Grok Build · 30 Soul-Searching Questions", desc: "Chapter 6 dissects real source code, and its questions are the most demanding. If you say you understand Coding Agents, these 30 questions are the litmus test — try answering aloud first, then check the framework.", tag: 'Quiz' },
          ],
        },
      ],
    },
    {
      id: 'p-dsh',
      num: 'Special Topic',
      title: 'Dissecting DeepSeek Harness: An All-Plugins Agent Foundation',
      desc: "This chapter reads TypeScript source; skipping it won't affect anything that follows. The Agent Harness DeepSeek open-sourced in 2026 turns the model, tools, sessions, sandbox, and UI all into swappable Cordis plugins, and sets one runtime invariant: everything the model sees must be reconstructible verbatim from the session log. Following the source, this chapter takes apart its plugin kernel, the Turn/Step loop, the dual-queue Inbox, the two Compaction paths, and the Code Mode sandbox, drawing evidence-based comparisons with Claude Code and Grok Build lesson by lesson.",
      color: '#4d6bfe',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],
      hardcore: true,
      topics: [
        {
          id: 't-dsh-map',
          title: 'System Map',
          desc: 'Cordis plugin kernel and three-layer config',
          lessons: [
            { file: 'dsh-1.html', title: "Everything Is a Plugin: Announcement vs Source", desc: "Which files in the deepseek-harness repo match the four modes and plugin ecosystem from the launch post? This lesson maps them one by one.", tag: 'Architecture' },
            { file: 'dsh-6.html', title: "Profile / Bundle / Patch: How Far Users Can Reshape the Product", desc: "Swap deep capabilities without touching source: config is four layers of patches stacked onto an empty array — later wins, same id means whole-entry replace.", tag: 'Architecture' },
          ],
        },
        {
          id: 't-dsh-loop',
          title: 'Sessions & Loops',
          desc: 'Log invariant, Dual-Queue Inbox, cancel recovery, and Goal',
          lessons: [
            { file: 'dsh-2.html', title: "Model-visible ⟺ logged: An Invariant That Crashes in Your Face", desc: "Everything the model sees must be reconstructable from the log; before sending a request, it rebuilds and checks on the spot—fail the check, then crash.", tag: 'Deep Dive' },
            { file: 'dsh-3.html', title: "followup / steer / inject: Dual-Queue Inbox", desc: "While the Agent is working and you want to say something: which queue the message joins, and when it gets handled. Three APIs share one send(); they differ by only two parameters.", tag: 'Interactive' },
            { file: 'dsh-7.html', title: "What Happens After Esc: Cancel, Crash Recovery, and Re-entry", desc: "One cancel signal per turn; balance the books even on interrupt; after kill -9, restart and keep going—every persisted result stays.", tag: 'Deep Dive' },
            { file: 'dsh-8.html', title: "Goal: Provenance Is Permission", desc: "Who may change a long-term goal? Auth doesn't read message bodies—only the provenance stamp the host puts on event metadata. This lesson covers the two layers behind that design.", tag: 'Design Pattern' },
          ],
        },
        {
          id: 't-dsh-context',
          title: 'Context Engineering',
          desc: 'Compaction dual paths, accounting, Spill, and search',
          lessons: [
            { file: 'dsh-4.html', title: "Compaction Dual Paths & replaceGeneration", desc: "When context is nearly full, pack proactively; when it really blows up, pack first then retry. Before retry, check the generation number — if packing didn’t work, no retry.", tag: 'Deep Dive' },
            { file: 'dsh-9.html', title: "Token Accounting: Replay for Decisions, Projection for Display", desc: "Two meters, each its own job—compaction decisions never trust the UI number. Core source: packages/llm/token-meter/src/usage-projection.ts.", tag: 'Concept' },
            { file: 'dsh-10.html', title: "Spill: When Tool Output Is Too Large", desc: "Over-limit output is archived to disk; the model keeps a retrieval credential. Core source:packages/spill/spill-policy/src/index.ts。", tag: 'Hands-on' },
            { file: 'dsh-11.html', title: "Session Search & Cross-Session Citations", desc: "Old sessions are a searchable corpus; citations can carry provenance. Core source: packages/session-query/ and packages/context/session-reference/.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-dsh-tools',
          title: 'Tool System',
          desc: 'Three-stage cascade, output contract, file edit, and unique tool surface',
          lessons: [
            { file: 'dsh-12.html', title: "Tool Execution Pipeline: Three-Stage Cascade & Monotone Guard", desc: "A three-stage line from pre-execute to post-execute — Guard can only tighten, never allow. Core source:packages/core/tools/src/index.ts。", tag: 'Architecture' },
            { file: 'dsh-13.html', title: "Tool Output Contract: Value Separated from Display", desc: "Same result — what the model sees and what people see can differ. Core source:packages/core/tools/src/index.ts and presentation.ts。", tag: 'Design Pattern' },
            { file: 'dsh-14.html', title: "File-Edit Engineering: Read Before Write", desc: "The read / edit / write trio — unread files can’t be edited. Core source:packages/fs/fs-observation-policy/src/index.ts。", tag: 'Hands-on' },
            { file: 'dsh-17.html', title: "DSH-Only Tool Surface: terminal / lsp / jobs", desc: "What the tools others lack each solve. Core source: packages/terminal/, packages/lsp/, and packages/jobs/; full tool descriptions in docs/tool-catalog.zh.md.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-dsh-security',
          title: 'Approvals & Sandbox',
          desc: 'Two independent knobs and a swappable Execution World',
          lessons: [
            { file: 'dsh-15.html', title: "Approvals & Permissions: Two Knobs, One Dropdown", desc: "Sandbox mode and approval policy are two independent knobs; presets are just common combos. Core source:packages/interaction/user-approval and packages/interaction/permission-presets。", tag: 'Security' },
            { file: 'dsh-16.html', title: "Sandbox: From seatbelt to the Execution World", desc: "ctx.fs and ctx.subprocess share one path namespace, so the execution environment can be swapped as a whole. Core source: packages/sandbox/, packages/e2b/, and native/landlock-run/.", tag: 'Security' },
          ],
        },
        {
          id: 't-dsh-code',
          title: 'Code Mode',
          desc: 'Let the model write programs to orchestrate tool calls',
          lessons: [
            { file: 'dsh-5.html', title: "Code Mode: One Program Beats Many Tool Rounds", desc: "The model writes a small program; run_code sends it into a worker sandbox; five tool calls finish in one round. This lesson covers the two ideas behind that design.", tag: 'Frontier' },
          ],
        },
        {
          id: 't-dsh-orch',
          title: 'Orchestration & Subagents',
          desc: 'Subagent seam and four orchestration primitives',
          lessons: [
            { file: 'dsh-18.html', title: "Subagent Is a Seam: In-Process to Delegating Claude Code", desc: "A sub-Agent is a capability seam — in-process, remote, or another product can plug in. Core source: packages/subagent/.", tag: 'Architecture' },
            { file: 'dsh-19.html', title: "workflow / schedule / plan / todo: Orchestration Primitives", desc: "What each of the four orchestration primitives owns, and why they were never merged into one monolith. Core docs: four files including docs/subsystems/workflow.zh.md.", tag: 'Concept' },
            { file: 'dsh-20.html', title: "Skill, Preset, and Self-Modification", desc: "cordis_define lets an Agent rewrite its own runtime while running. Core directories: packages/extensions/tool-cordis/ and apps/cli/config/agent-presets/.", tag: 'Frontier' },
          ],
        },
        {
          id: 't-dsh-integration',
          title: 'Models & External Integration',
          desc: 'LLM adapter layer, MCP, and test infrastructure',
          lessons: [
            { file: 'dsh-21.html', title: "MCP & Extensions: Two Paths to External Tools", desc: "How bridging the ecosystem standard and native extensions divide the work. Core source:packages/mcp/mcp-client/ and packages/extensions/。", tag: 'Deep Dive' },
            { file: 'dsh-22.html', title: "LLM Adapter Layer: Single Attempt, Explicit Retry, Dual-Stream Persistence", desc: "Reasoning and text streams stored separately; retries are explicit events. Core source:packages/llm/llm/src/assembler.ts and packages/core/agent-loop/src/agent.ts.", tag: 'Deep Dive' },
            { file: 'dsh-26.html', title: "Testing a Nondeterministic System", desc: "Deterministic replay, property-based testing, and a fault server built to trick LLM clients. Core materials: docs/testing.zh.md and packages/test-support/.", tag: 'Hands-on' },
          ],
        },
        {
          id: 't-dsh-persist',
          title: 'Persistence & Infrastructure',
          desc: 'Log governance, credential storage, and multi-entry kernel',
          lessons: [
            { file: 'dsh-23.html', title: "Persistence Governance: Versions, fork Boundaries, Refuse-to-Parse", desc: "How log formats evolve, how fork boundaries are set, and prefer refusing data you can’t read.", tag: 'Architecture' },
            { file: 'dsh-24.html', title: "Credentials, Settings, Storage, and Telemetry", desc: "Unsexy and full of traps: credentials resolved every time, secrets never land in config.", tag: 'Hands-on' },
            { file: 'dsh-25.html', title: "Multi-Entry & Typert: One Kernel, Five Faces", desc: "Web, headless, ACP, SDK, and HTTP share one kernel.", tag: 'Architecture' },
          ],
        },
        {
          id: 't-dsh-method',
          title: 'Engineering Methodology',
          desc: 'A discipline system for building AI with AI',
          lessons: [
            { file: 'dsh-27.html', title: "Agent Notes & AGENTS.md: Discipline for Building AI with AI", desc: "Four-state design notes and coding standards written for AI — your team can copy them immediately.", tag: 'Recap' },
            { file: 'dsh-28.html', title: "KV Cache Is an Interface", desc: "Treat prompt prefix stability as a compatibility promise.", tag: 'Frontier' },
          ],
        },
        {
          id: 't-dsh-final',
          title: 'Beyond the Source',
          desc: 'Five engineering views and a minimum copy list',
          lessons: [
            { file: 'dsh-29.html', title: "Finale: Five Engineering Views — What Should We Copy?", desc: "Five harnesses’ design-philosophy master table, plus a minimum copy list and a scale-trap list.", tag: 'Finale' },
          ],
        },
      ],
    },
    {
      id: 'p-oss',
      num: 'Special Topic',
      title: 'Open Source, Distillation, and Local Deployment',
      desc: 'The news announces another open-source model every week, but what exactly is being opened? This chapter starts from the weights, teaches you to read a license yourself, and works out the business calculation behind each vendor\'s open-source strategy. Then it turns to how models get smaller: emergence, distillation, and the homogenization that distillation costs you. Finally, hands-on: work out how large a model your own computer can run, and get it running with Ollama or LM Studio.',
      color: '#4f46e5',
      group: 'indie',
      cluster: 'hardcore',
      routes: [],
      topics: [
        {
          id: 't-oss-what',
          title: 'What Open Source Actually Opens',
          desc: 'Weights, licenses, and each vendor\'s business calculation',
          lessons: [
            { file: 'oss-1.html', title: "What Are Weights? Everything a Model Knows", desc: "The news announces another open-sourced model every week. What exactly is being opened? The code? Mostly it is one file: the weights. Once you know what that file is, you can judge every open-source argument that follows on your own.", tag: 'Concept' },
            { file: 'oss-2.html', title: "Real vs. Fake Open Source: How to Read a License", desc: "Almost every vendor says its models are \"open source,\" but the word means very different things from one to the next. Some let you build a business on them with no conditions, some require a separate contract once your user base grows, and some have only published a paper. Learning to judge for yourself beats memorizing who is open.", tag: 'Selection' },
            { file: 'oss-3.html', title: "Open Source Is a Business: What Each Vendor Is After", desc: "Training a flagship model burns an enormous amount of compute, and once the weights are out they can never be pulled back. So why do so many companies still open-source? The answer has nothing to do with charity. Understand what each of them is counting on and your selection decisions get a lot steadier.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-oss-small',
          title: 'How Large Models Get Smaller',
          desc: 'Emergence, distillation, and the price you have to pay',
          lessons: [
            { file: 'oss-4.html', title: "Emergence: Why Abilities Show Up All at Once", desc: "Bigger models are stronger — that sounds obvious enough. Reality is a little more complicated. Some abilities score near zero while a model is small, and then, once the parameter count crosses a certain order of magnitude, they are simply there. The phenomenon is called emergence, and it is the starting point for every tension in the sections that follow.", tag: 'Concept' },
            { file: 'oss-5.html', title: "Why Make Models Smaller: The Motivation Behind Distillation", desc: "The last section just finished explaining that capability emerges more readily in larger models. So why is the whole industry working so hard to make models smaller? Because capability is not the only constraint. Cost, latency, and whether your data is allowed to leave the building are three things that rule flagship models out of real projects.", tag: 'Methodology' },
            { file: 'oss-6.html', title: "How Distillation Works: From Teacher to Student", desc: "The last lesson covered why you'd want a smaller model. This one covers how. The process is plainer than you might expect: have the teacher answer questions, record how it got there, and train the student on that material. The difficulty isn't in the pipeline — it's in the details.", tag: 'Case Study' },
            { file: 'oss-7.html', title: "The Cost of Distillation: Models Are Getting More Alike", desc: "The last lesson described distillation as the student learning from the teacher. The problem is that what the student learns is everything the teacher has: the skills, the verbal tics, the biases, even its sense of its own identity. When an entire industry is learning from the same few teachers, the result is that everyone starts to look the same.", tag: 'Deep Dive' },
          ],
        },
        {
          id: 't-oss-local',
          title: 'Running It on Your Own Machine',
          desc: 'Do the math, then install it',
          lessons: [
            { file: 'oss-8.html', title: "How Large a Model Can Your Computer Run", desc: "Everything so far has been concepts; this lesson is hands-on. Pick your GPU or your Mac model and read the answer straight off. By the end you will see that the bar for running models locally is lower than most people assume.", tag: 'Interactive' },
            { file: 'oss-9.html', title: "Getting Started with Ollama and LM Studio", desc: "The last lesson worked out what you can run; this one installs it. Two tools, one on the command line and one with a graphical interface, and ten minutes to a working setup the first time.", tag: 'Hands-on' },
          ],
        },
      ],
    },
    {
      id: 'p-exam',
      num: 'Test Center',
      title: 'Seven Chapter Tests · 350 Questions',
      desc: "Practise by chapter and review explanations. Recent scores remain in this browser; company accounts, a personal dashboard and cloud weakness analysis are not connected.",
      color: '#7c3aed',
      exam: true,
      group: 'extra',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-exam-entry',
          title: 'How to Use These Seven Exams',
          desc: 'Differences between the two modes and usage tips',
          lessons: [
            { file: 'exam.html', title: "7 Chapter Quizzes · 350 Questions", desc: "One quiz per chapter, 50 questions each, all written directly from the chapter content. Take the quiz right after finishing a chapter — it's far more effective than re-reading. Once you've completed all seven chapters, there's a comprehensive cross-chapter final exam waiting for you.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-exam-base',
          title: 'Fundamentals & Harness',
          desc: 'Tests for Part 1 and Part 2',
          lessons: [
            { file: 'exam-1.html', title: "LLM Fundamentals · Chapter Self-Assessment", desc: "Test your understanding after completing Chapter 1. All 50 questions come from this chapter's content: the three training stages, Tokens & context, the four hallucination types, and four mitigation strategies.", tag: 'Interactive' },
            { file: 'exam-2.html', title: "AI Harness · Chapter Quiz", desc: "Verify your understanding after completing Chapter 2. All 50 questions are drawn from this chapter: context windows, Prompt engineering, injection defense, tool calls, KV Cache and cost optimization.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-exam-build',
          title: 'Practice & Design Patterns',
          desc: 'Tests for Part 3 and Part 4',
          lessons: [
            { file: 'exam-3.html', title: "From Demo to Product · Chapter Quiz", desc: "Test your understanding after completing Chapter 3. All 50 questions are drawn from this chapter: image-gen productization, Agent stuck loops & failsafes, context compression, long-term memory, multi-Agent, and MCP.", tag: 'Interactive' },
            { file: 'exam-4.html', title: "AI Engineering Design Patterns · Chapter Quiz", desc: "Test yourself after finishing Chapter 4. All 50 questions are drawn from this chapter: Workflow vs Agent, Context Engineering, ACI tool design, evaluation methodology, sandboxing and credential isolation.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-exam-deep',
          title: 'Frontier, Source & Methodology',
          desc: 'Tests for Part 5, Part 6, and Part 7',
          lessons: [
            { file: 'exam-5.html', title: "Harness & Self-Improvement · Chapter Quiz", desc: "Test your knowledge after completing Chapter 5. All 50 questions are drawn from this chapter: Harness design patterns, context auto-evolution, and the mechanisms and seven challenges of recursive self-improvement.", tag: 'Interactive' },
            { file: 'exam-6.html', title: "Dissecting Grok Build · Chapter Quiz", desc: "Finished Chapter 6? Test yourself. All 50 questions are drawn from this chapter: runtime loop, Compaction, tool system, memory retrieval, sandbox security & MCP integration.", tag: 'Interactive' },
            { file: 'exam-7.html', title: "Vibe Coding Methodology · Chapter Quiz", desc: "Test yourself after completing Chapter 7. All 50 questions come from this chapter: workflow control, quality baseline, no-compromise merging, documentation practices, environment & safety gates.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-exam-all',
          title: 'After the Full Course',
          desc: 'Cross-chapter comprehensive exam',
          lessons: [
            { file: 'exam-all.html', title: "Full-Site Comprehensive Exam · 35 Questions from 7 Chapters", desc: "Chapter quizzes test whether you retained a single chapter — this exam tests something else: whether you can keep cross-chapter concepts straight. Where does context compression end and long-term memory begin? When do you pick Workflow over Agent? How does Harness relate to prompt engineering? These gaps only show up when all seven chapters are tested together. Come back after completing the full course.", tag: 'Interactive' },
          ],
        },
      ],
    },
    {
      id: 'p9',
      num: 'Bonus',
      title: 'One-Person Company (OPC)',
      desc: "AI lets one person ship a product—and also multiplies what can be taken from you. This chapter is about securing rights and staying compliant: trademarks, software copyright, patents, domains, ICP filing, registered capital, equity. Every lesson cites the statute and a real case. Do it early and it's an investment; do it late and it's a loss. All lessons are available locally; progress stays in this browser.",
      color: '#b45309',
      group: 'extra',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-opc-basics',
          title: 'The Foundations of Rights Clearance',
          desc: 'The matching lock for each asset',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'opc-1.html', title: "Six Weapons: The Right Lock for Each Asset", desc: "The code you write, the name you choose, the algorithm you invent, the article you publish—in law these are completely different things, each with its own lock. The wrong lock is no lock. This lesson names all six weapons at once; every later lesson comes back to them.", tag: 'Intro' },
            { file: 'opc-2.html', title: "Clear Rights Early: Early Is Investment, Late Is Loss", desc: "Last lesson named the six weapons; this one is about when to move. The answer is short: the earlier the better. Rights clearance has a cruel trait—the same action costs a few hundred yuan early, and tens of thousands plus a year or two late.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-opc-tm',
          title: 'Trademarks and Domain Names',
          desc: "The brand's household registry and its front door",
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'opc-3.html', title: "One Trademark Isn't Enough: Take Classes 35, 42, and 41 Together", desc: "Trademarks split goods and services into 45 classes—you’re protected only in the class you register. Plenty of people register one class and call it done, then discover promotion itself sits in another class. This lesson covers the classes that matter most for internet products, plus the invisible trap of specimen consistency.", tag: 'Interactive' },
            { file: 'opc-4.html', title: "After a Refusal: Clear the Blocking Mark", desc: "“方片数智” was refused on the first filing. What blocked it was a prior trademark registered back in 2015—and long unused. This lesson walks the full chain from refusal through three-year non-use cancellation to review of refusal. We ran this path ourselves.", tag: 'Case Study' },
            { file: 'opc-5.html', title: "Lock Down the Domains: How a ¥100,000 Ask Became ¥5,000", desc: "miyang.cn once sat on a marketplace at a ¥102,222 buy-it-now price. We closed near ¥5,000. No negotiation magic—just one thing done three years earlier: almost every usable extension for the brand was already registered in our name.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-opc-code',
          title: 'Code, Content, and Technology',
          desc: 'Copyright arises automatically; evidence you earn',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'opc-6.html', title: "Software Copyright and Recordation: Rights Arise Automatically, Evidence You Earn", desc: "Copyright arises the moment a work is created—no registration required. Sounds easy, until you’re copied and headed to court: rights are automatic; evidence is not. This lesson covers software copyright registration (软著) and copyright recordation—cheap ways to buy evidence—plus a major outsourcing pitfall.", tag: 'Interactive' },
            { file: 'opc-7.html', title: "Patent or Trade Secret: File First, Disclose Later", desc: "If you actually have real tech, you face a choice: file a patent, or keep it as a trade secret. The two paths run on opposite logic—pick wrong and it costs you. Even worse is the order problem: ship the product before you file, and that patent can never be filed.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-opc-entity',
          title: 'Entity Setup and Go-Live Compliance',
          desc: 'Filing, licenses, registered capital',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'opc-8.html', title: "ICP Filing Is the Foundation; an ICP License Is the Right to Charge", desc: "Many people treat “ICP filing” and “ICP license” as the same thing. They’re two things—separated by RMB 1,000,000 of registered capital. Filing is the prerequisite for a site to be reachable in China; everyone needs it. An ICP license is the legal right to charge users; the bar is much higher. This lesson clears both up—and focuses on the one decision you must get right on incorporation day.", tag: 'Interactive' },
            { file: 'opc-9.html', title: "Don't Inflate Registered Capital: You Must Pay It In Within Five Years", desc: "In the subscribed-capital era people loved writing a flashy registered capital—no cash needed upfront. That game ended in July 2024: the new Company Law requires subscribed capital to be paid in within five years. This lesson covers how to set the number—and dismantles the two traps that blow up solo founders fastest: mixing personal and company books, and taking the “easy” gray-market collection shortcut.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-opc-equity',
          title: 'Partnership and Equity',
          desc: 'Complementarity, control, nominee arrangements, and exit',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'opc-10.html', title: "Partners Must Complement: Don't Partner with Someone Whose Skills Overlap Yours", desc: "Solo gets you only so far—you'll hit a gap you can't fill yourself. That's when partners enter the chat. The first filter is complementary skills; shared passion comes second. This lesson covers two rules, plus a “trial period” that can spare you a lot of pain.", tag: 'Interactive' },
            { file: 'opc-11.html', title: "Equal Thirds Is the Most Expensive Kind of Fairness", desc: "Three people building together, one-third each—nobody loses face, and the room feels good at the split. The cost shows up months later: the company can't decide. This lesson runs the voting thresholds, then explains why the core founder should hold 70%+.", tag: 'Interactive' },
            { file: 'opc-12.html', title: "Don't Split Equity by Gut Feel: Run Five Dimensions", desc: "Last lesson was structure; this one is how the ratios come from. Numbers bargained by gut leave both sides feeling shortchanged later. Split contribution into five dimensions, weight each, then negotiate—the fight shifts from “who's more important” to “who owns this dimension.”", tag: 'Interactive' },
            { file: 'opc-13.html', title: "Sign a Nominee Agreement First; File the Company Registry Change When It Vests", desc: "You’ve settled the split—next is how to grant it. The early-stage trap is overbuilding the structure: holding platforms, option pools, a pile of entities—before the company is even running. This lesson covers three disciplines, and the costliest lesson of all: if the person who left won’t sign, the company can lock up.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-opc-strategy',
          title: 'Strategy and Finale',
          desc: 'Going global, model selection, and the new startup formula',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'opc-14.html', title: "Server Location Doesn't Matter—Where Your Users Are Does", desc: "A lot of so-called AI going-global just means parking servers in Singapore, wrapping an offshore model API, and still serving users inside China. That move is worthless for compliance. This lesson clears the test first, then what real going-global actually requires.", tag: 'Interactive' },
            { file: 'opc-15.html', title: "The Long Tail Big Tech Ignores Is Where a Solo Founder Wins", desc: "Big companies green-light projects only past an ROI bar—a market can be real and still too small for anyone there to chase. That bar blocks your strongest competitors. This lesson covers how to choose between domestic long tail and overseas, then something that hits cost directly: how to pick models.", tag: 'Interactive' },
            { file: 'opc-final.html', title: "The New Startup Formula: Find Buyers First, Then Build with AI", desc: "The first fifteen lessons were about not stepping in traps: trademarks, software copyright (软著), patents, filings, registered capital, equity. This lesson is about where to go. The old startup formula is dead—its first step bet on a technical barrier, and that barrier is now near zero. This finale spells out the new formula, lays the fifteen lessons on one map, and hands you a checklist you can tick.", tag: 'Finale' },
          ],
        },
      ],
    },
    {
      id: 'p-seo',
      num: 'Bonus',
      title: 'Get Found: SEO & GEO',
      desc: "Study SEO and GEO through public-website examples from the source course. Case histories and traffic are not Fangpian internal-platform results; internal access follows company arrangements.",
      color: '#4338ca',
      bonus: true,
      group: 'extra',
      routes: ['use', 'pro', 'pm', 'build'],
      topics: [
        {
          id: 't-seo-why',
          title: 'First, Get Clear on Being Found',
          desc: 'Shipping it is not the same as anyone showing up',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'seo-1.html', title: "You Built It. Why Isn't Anyone Coming?", desc: "Earlier lessons got the product built. OPC locked down the rights. Then comes a plainer question: shipping is not the same as being found. This lesson takes \"discovery\" apart: which three roads traffic comes from, what each one is like, then a five-layer funnel to find where your product is stuck.", tag: 'Intro' },
          ],
        },
        {
          id: 't-seo-field',
          title: 'Two Battlegrounds',
          desc: 'Search engines hand out links; AI engines hand out answers',
          routes: ['use', 'pro', 'pm', 'build'],
          lessons: [
            { file: 'seo-2.html', title: "The SEO Minimum Viable Checklist: Crawlable, Readable, Indexable", desc: "SEO got wrapped in \"secret playbooks\" until it sounded mystical. For a one-person site, the part worth doing is small and clear: let crawlers get it, let engines read it, let indexing be checkable. This lesson only covers what works if you do it and goes to zero if you don't. Every item you can check yourself.", tag: 'Hands-on' },
            { file: 'seo-3.html', title: "GEO: Get AI Engines to Cite You", desc: "More and more users skip the search box and drop the question straight into ChatGPT, Kimi, or Doubao. The answer is assembled by AI — whether ythe case-study site shows up inside it is the new survival line. The craft has a name: GEO (Generative Engine Optimization). This lesson covers its four levers, each with a toy you can play with on the spot.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-seo-case',
          title: 'Dissecting a Real Case',
          desc: "The checklists and levers from the last two lessons all land on one real patient this time: the case-study site itself. On 10 August 2026 we ran a full-site SEO / GEO audit, found ten gaps, and fixed a first round that same week. This lesson picks the five most representative ones. For each: how we found it, what we changed, how we check.",
          routes: ['pm', 'build'],
          lessons: [
            { file: 'seo-4.html', title: "Dissecting This Site: Google Indexes 693 Pages, Bing Only 50", desc: "The checklists and levers from the last two lessons all land on one real patient this time: the case-study site itself. On 10 August 2026 we ran a full-site SEO / GEO audit, found ten gaps, and fixed a first round that same week. This lesson picks the five most representative ones. For each: how we found it, what we changed, how we check.", tag: 'Case Study' },
          ],
        },
        {
          id: 't-seo-final',
          title: 'Priorities and Wrap-up',
          desc: 'A solo builder has no SEO team, only the ability to put things in order',
          routes: ['pm', 'build'],
          lessons: [
            { file: 'seo-5.html', title: "Solo Priorities: Write Questions People Actually Search", desc: "The first three lessons covered the technical checklist — all one-time jobs. The real daily fight is content: what to write, and what to write first. A one-person company has no SEO team and no keyword-tool budget. Your only weapon is ranking your bets: spend effort on questions people search, trade real experience for trust, and stay off the crooked path.", tag: 'Hands-on' },
            { file: 'seo-final.html', title: "Getting-Found Launch Checklist: One Last Pass Before You Ship", desc: "Chapter finale. Everything from the first five lessons fits on one 12-item list. Each item is an action you can verify on the spot: inspect source, count entries, paste a URL, read a log. Check progress lives in this browser; come back every time you ship a new product. After the list, four measurement definitions answer the only question that matters: how do you know this work wasn't wasted.", tag: 'Finale' },
          ],
        },
      ],
    },
    {
      id: 'p8',
      num: 'Bonus',
      title: "Lei Jun's Startup Lessons",
      desc: "This isn't an AI course — it's a dessert after the main course: compiled from Lei Jun's oral startup lectures, covering products, word-of-mouth, fundraising, valuation, equity, and cash flow. For those looking to build a one-person company (OPC) with AI, this fills in the \"how to run a business\" methodology. The entire chapter is free and open without login.",
      color: '#f97316',
      bonus: true,
      group: 'extra',
      routes: ['pm', 'build'],
      topics: [
        {
          id: 't-lei-mind',
          title: "The Entrepreneur's Mindset",
          desc: 'Determination, courage, and the mental preparation of facing mortality',
          lessons: [
            { file: 'lei-1.html', title: "Who Should Start a Company: That Irrational Confidence", desc: "Who is cut out for entrepreneurship? Lei Jun's answer starts with a joke: 「Starting a business is not something for normal people — it's for the crazy ones.」 This lesson covers the three capabilities every founder needs, and what kept him going when Kingsoft was on the brink in 1996.", tag: 'Intro' },
            { file: 'lei-2.html', title: "Mental Readiness: Plan for Failure from Day One", desc: "Most founders spend Day One imagining how successful their company will be. Lei Jun spent Xiaomi's Day One thinking about how it might die. This lesson covers his motivation to start over at 40, his clear-eyed view of failure rates, and three concrete survival strategies.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-lei-dir',
          title: 'Direction & Starting Point',
          desc: 'What you love, what you can do, and a big enough market',
          lessons: [
            { file: 'lei-3.html', title: "Choosing a Direction: Go Big Market", desc: "\"The things you're doing may not be the biggest things you're capable of.\" This lesson is Lei Jun's greatest regret and lesson from his time at Kingsoft: how to choose a direction, how to estimate the ceiling, and a phrase he used more than the person who coined it — Go Big Market.", tag: 'Interactive' },
            { file: 'lei-4.html', title: "Naming: Win from the Starting Line", desc: "Of all the founders Lei Jun has met, 99.9% picked their company name at random. Yet names like Lenovo, Baidu, Tencent, and Huawei are all excellent. This is no coincidence: \"How much time you spend on a name tells you how much time you'll spend on the business.\" This lesson traces how the name \"Xiaomi\" was forged.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-lei-product',
          title: 'Product & Word-of-Mouth',
          desc: 'Focus, perfection, reputation, speed',
          lessons: [
            { file: 'lei-5.html', title: "The Internet Seven-Word Mantra", desc: "\"The internet is actually a mindset — a way of doing things. That way can be summed up in seven words (four concepts): Focus, Excellence, Word-of-Mouth, Speed.\" Lei Jun says anyone who truly internalizes these seven words becomes unstoppable. The scary part: you have to actually live them.", tag: 'Interactive' },
            { file: 'lei-6.html', title: "The True Nature of Word-of-Mouth: Exceeding Expectations", desc: "The internet makes word-of-mouth spread incredibly fast: if something is genuinely good, consumers will share it quickly. But what earns word-of-mouth? Lei Jun spent a long time working this out, and the answer came from two personal experiences: a disappointing trip to the Burj Al Arab, and a meal at Haidilao that moved him deeply.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-lei-money',
          title: 'Fundraising',
          desc: 'Credibility is the entire foundation of fundraising',
          lessons: [
            { file: 'lei-7.html', title: "Your First Check: Start with People You Know", desc: "The very first thing when starting a company is money. Lei Jun's answer is simple: angel investing is just pooling money from acquaintances. The real question is why anyone should trust you. This lesson covers where your first funding comes from, how to build credibility, and why a hundred-page business plan gets ignored.", tag: 'Interactive' },
            { file: 'lei-8.html', title: "Fundraising Timing: You Need Money to Raise Money", desc: "The world is paradoxical: you can only raise money when you already have money. Keep enough cash in the bank, start fundraising when you've spent half, and let investors come to you. Then understand the VC's ledger — once you see why wanting 10x isn't greed, you'll know exactly when and how to talk money.", tag: 'Interactive' },
            { file: 'lei-9.html', title: "The Art of Valuation: Fundraising Sells Confidence", desc: "Higher valuation is better? Lei Jun's conclusion is the opposite: a high valuation means you're selling a higher expectation—and if you can't deliver, you'll pay the price. This lesson covers how to price (do market research first, then start from the midpoint and work up), and the true nature of fundraising: selling confidence.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-lei-equity',
          title: 'Equity & Co-Founders',
          desc: "Starting a business is a puzzle of sharing 100% of a dream",
          lessons: [
            { file: 'lei-10.html', title: "Equity Is a Puzzle: Never Split It Equally", desc: "When you first start a company, that 100% equity is really just a dream. The startup journey is the process of sharing that 100% dream with money, the best engineers, and the best marketing and resources. Lei Jun's own words: starting a company is assembling a puzzle.", tag: 'Interactive' },
            { file: 'lei-11.html', title: "Co-founders: Share the Vision First, Then Split Equity", desc: "Equity allocation is relative, not absolute: if the company reaches $1 billion, 1% is $10 million. So the sequence when finding a co-founder can't be reversed: first share the vision — if they don't buy in, even giving them 100% is useless; then discuss roles, contributions, and equity split; finally, address the hardest topic: a four-year lock-up and exit mechanism.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-lei-ops',
          title: 'Business Fundamentals',
          desc: 'Cash flow and people are the lifeblood of a company',
          lessons: [
            { file: 'lei-12.html', title: "Cash Flow & Compensation Packages", desc: "For an early-stage startup, the most important number is how much cash you have in the bank: if you had zero revenue, how many months could you survive? That's a question every startup should think about every day. This lesson covers Lei Jun's three financial calculations: cash runway, cash flow, and the \"compensation package\" designed for your best people.", tag: 'Interactive' },
          ],
        },
        {
          id: 't-lei-final',
          title: 'Topic Wrap-Up',
          desc: "Turning Lei Jun's lessons into an OPC action plan",
          lessons: [
            { file: 'lei-final.html', title: "A Solo Company for the AI Age", desc: "All 22 oral segments have been covered. Lei Jun was talking about running a company, but in the AI era, one person is a company: you are the CEO, and also the technical genius; your savings are cash on account, and your time is 100% of the equity. This final session spreads all 12 lessons into a panoramic map, then turns it into a self-check list and action list for the OPC (One Person Company).", tag: 'Finale' },
            { file: 'lei-test.html', title: "Test Your AI Startup Success Rate", desc: "13 lessons done — now it's your turn. 12 questions, all drawn from Lei Jun's core judgments across the course: mindset, direction, product, cash, partnerships, and AI leverage. Go with your gut; don't try to guess the \"right answer\" — this measures who you actually are right now.", tag: 'Interactive' },
          ],
        },
      ],
    },
  ],
};

/* ── Tag styling ── */
window.TAG_STYLE = {
  'Interactive':   { bg: '#dcfce7', fg: '#15803d' },
  'Animation':     { bg: '#dcfce7', fg: '#166534' },
  'Concept':       { bg: '#fef9c3', fg: '#a16207' },
  'Case Study':    { bg: '#fef2f2', fg: '#dc2626' },
  'Intro':         { bg: '#fef2f2', fg: '#dc2626' },
  'Security':      { bg: '#fef2f2', fg: '#dc2626' },
  'Anti-pattern':  { bg: '#fef2f2', fg: '#dc2626' },
  'Hands-on':      { bg: '#dbeafe', fg: '#1d4ed8' },
  'PM Advanced':   { bg: '#dbeafe', fg: '#1d4ed8' },
  'System Design': { bg: '#dbeafe', fg: '#1d4ed8' },
  'Deep Dive':     { bg: '#ffedd5', fg: '#ea580c' },
  'Multimodal':    { bg: '#fef3c7', fg: '#92400e' },
  'Selection':     { bg: '#fef3c7', fg: '#d97706' },
  'Prompt Craft':  { bg: '#e0f2fe', fg: '#0369a1' },
  'RAG':           { bg: '#f3e8ff', fg: '#7e22ce' },
  'Architecture':  { bg: '#dcfce7', fg: '#166534' },
  'Recap':         { bg: '#ede9fe', fg: '#6d28d9' },
  'Finale':        { bg: '#fef9c3', fg: '#a16207' },
  'Tips':          { bg: '#ecfdf5', fg: '#065f46' },
  'Design Pattern':{ bg: '#fef2f2', fg: '#dc2626' },
  'Methodology':   { bg: '#fff7ed', fg: '#c2410c' },
  'Standards':     { bg: '#ccfbf1', fg: '#0f766e' },
  'Frontier':      { bg: '#f3e8ff', fg: '#7c3aed' },
  'Quiz':          { bg: '#fee2e2', fg: '#b91c1c' },
};

/* ── Utility: flatten all lessons for prev/next navigation ── */
window.COURSE_FLAT = (function () {
  var flat = [];
  window.COURSE.parts.forEach(function (part) {
    part.topics.forEach(function (topic) {
      topic.lessons.forEach(function (lesson) {
        flat.push(Object.assign({}, lesson, {
          partId: part.id, partTitle: part.title, partNum: part.num,
          topicId: topic.id, topicTitle: topic.title,
        }));
      });
    });
  });
  return flat;
})();
