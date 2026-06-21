"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import cameraAnimation from "../../public/camera.json";
import {motion} from "framer-motion";
import { AnimatedText,Typewriter } from "../../components/animations";

const CHIPS: Record<string, string[]> = {
  videoType: [
    "To'y / Wedding","Nikoh marosimi","Reklama / Commercial",
    "Korporativ video","Reels / TikTok","Portret / Interview",
    "Restoran / Cafe","Boshqa",
  ],
  duration: ["30 soniya","1 daqiqa","2–3 daqiqa","5+ daqiqa","Aniq emas"],
  platform: [
    "Instagram Reels","TikTok","YouTube",
    "Telegram","Ekranda ko'rsatish","Shaxsiy arxiv",
  ],
  style: [
    "Sinematik / Kino","Hujjatli / Documentary","Dinamik / Energik",
    "Romantik / Hissiy","Minimalist","Vintage / Retro",
  ],
  music: [
    "O'zbek milliy","Lounge / Ambient","Pop / Zamonaviy",
    "Klassik / Orkestr","Electronic / Beat","Mijoz o'zi tanlaydi",
  ],
};

const SINGLE_SELECT = ["videoType", "duration"];

// Bu yerda formaning chiplarini va boshqa kichik komponentlari
type ChipsState = Record<string, string[]>;
function ChipGroup({
  id, chips, selected, onToggle,
}: {
  id: string;
  chips: string[];
  selected: string[];
  onToggle: (id: string, val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onToggle(id, chip)}
          className={`px-4 py-1.5 rounded-full code text-sm border transition-all ${
            selected.includes(chip)
              ? "bg-neutral-200 text-neutral-800 border-neutral-100"
              : "bg-neutral-50/10 text-neutral-100 border-neutral-200 hover:border-neutral-400"
          }`}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

let cardIndex = 0;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold minicode tracking-widest uppercase text-neutral-400 mb-3">
      {children}
    </p>
  );
}

function Card({ children,index=0 }: { children: React.ReactNode , index?: number}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white/10 rounded-2xl border border-neutral-100 p-6 mb-3">
        {children}
    </motion.div>
  );
}


export default function BriefForm() {
  const [fields, setFields] = useState({
    name: "", phone: "", social: "", date: "",
    location: "", notes: "", budgetMin: "", budgetMax: "", budgetNote: "",
  });
  const [chips, setChips] = useState<ChipsState>({
    videoType: [], duration: [], platform: [], style: [], music: [],
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function toggleChip(id: string, val: string) {
    setChips((prev) => {
      const current = prev[id];
      if (SINGLE_SELECT.includes(id)) {
        return { ...prev, [id]: current.includes(val) ? [] : [val] };
      }
      return {
        ...prev,
        [id]: current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      };
    });
  }

  async function handleSubmit() {
    if (!fields.name || !fields.phone) {
      setErrorMsg("Ism va telefon raqam majburiy.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    const budget =
      fields.budgetMin || fields.budgetMax
        ? `$${fields.budgetMin || "0"} – $${fields.budgetMax || "?"}${fields.budgetNote ? ` (${fields.budgetNote})` : ""}`
        : "—";

    const body = {
      name: fields.name,
      phone: fields.phone,
      social: fields.social || "—",
      date: fields.date || "—",
      videoType: chips.videoType.join(", ") || "—",
      duration: chips.duration.join(", ") || "—",
      platform: chips.platform.join(", ") || "—",
      style: chips.style.join(", ") || "—",
      music: chips.music.join(", ") || "—",
      location: fields.location || "—",
      notes: fields.notes || "—",
      budget,
    };

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-neutral-100 p-10 text-center max-w-sm w-full">
          <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Brief yuborildi!</h2>
          <p className="text-sm text-neutral-400 mb-6">
            Tez orada siz bilan bog'lanamiz.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setFields({ name:"",phone:"",social:"",date:"",location:"",notes:"",budgetMin:"",budgetMax:"",budgetNote:"" });
              setChips({ videoType:[],duration:[],platform:[],style:[],music:[] });
            }}
            className="text-sm text-neutral-500 underline underline-offset-2"
          >
            Yangi brief to'ldirish
          </button>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen flex items-start justify-center p-4 lg:p-8">

      <div>

        {/* Header */}
      <div className="head w-full flex items-center justify-center gap-3 mb-8 ">
              <div className="w-10 h-10 bg-neutral-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 10l4.553-2.277A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14v-4zM3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-100 leading-tight code"><AnimatedText text="Video Brief" /></h1>
                <p className="text-xs minicode text-neutral-400">Loyiha haqida ma'lumot bering</p>
              </div>
      </div>

      {/* forms */}
      <div className=" form w-full max-w-5xl lg:h-[calc(100vh-160px)] bg-white/10 backdrop-blur-xl rounded-3xl shadow-sm flex flex-col lg:flex-row overflow-hidden">

        {/* right side "Lottie qism" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full lg:w-[420px] lg:shrink-0 bg-neutral-100/10 flex flex-col items-center justify-center px-8 py-10 order-first lg:sticky lg:top-8 lg:self-start lg:rounded-l-3xl sm:none">
          <Lottie
          animationData={cameraAnimation}
          loop={true}
          className="w-full max-w-sm"
        />
        <h2 className="text-2xl font-semibold code text-neutral-100 text-center mt-6">
          <Typewriter text={'Ajoyib video \n mukammal brief dan boshlanadi'} />
        </h2>
        <motion.p
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-neutral-400 text-center mt-3 max-w-xs">
          Forma to'ldiring, tez orada siz bilan bog'lanamiz va loyihangizni muhokama qilamiz.
        </motion.p>
        </motion.div>

        {/* left side "To'ldiriladigan forma" */}
        <div className="flex-1 bg-neutral-100/10 overflow-y-auto">
          <div className="max-w-xl mx-auto px-6 py-8">

            {/* Mijoz */}
            <Card index={0}>
              <SectionLabel>Mijoz ma'lumotlari</SectionLabel>


              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">Ism va familiya *</label>
                  <input name="name" value={fields.name} onChange={handleField}
                    placeholder="Palonchaev pistoncha"
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-neutral-50/10 text-neutral-100 focus:outline-none focus:border-neutral-400" />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">Telefon *</label>
                  <input name="phone" value={fields.phone} onChange={handleField}
                    placeholder="+998 90 000 00 00"
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-neutral-50/10 text-neutral-100 focus:outline-none focus:border-neutral-400" />
                </div>
              </div>



              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">Ijtimoiy tarmoq</label>
                  <input name="social" value={fields.social} onChange={handleField}
                    placeholder="@username"
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-100 bg-neutral-50/10 focus:outline-none focus:border-neutral-400" />
                </div>
                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">Tadbir sanasi</label>
                  <input name="date" type="date" value={fields.date} onChange={handleField}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-neutral-50/10 text-neutral-100 focus:outline-none focus:border-neutral-400" />
                </div>
              </div>
            </Card>

            {/* Video turi */}
            <Card index={1}>
              <SectionLabel>Video turi</SectionLabel>
              <ChipGroup id="videoType" chips={CHIPS.videoType} selected={chips.videoType} onToggle={toggleChip} />
              <hr className="my-4 border-neutral-100" />
              <SectionLabel>Davomiylik</SectionLabel>
              <ChipGroup id="duration" chips={CHIPS.duration} selected={chips.duration} onToggle={toggleChip} />
            </Card>

            {/* Platform */}
            <Card index={2}>
              <SectionLabel>Platform</SectionLabel>
              <ChipGroup id="platform" chips={CHIPS.platform} selected={chips.platform} onToggle={toggleChip} />
              <hr className="my-4 border-neutral-100" />
              <SectionLabel>Uslub</SectionLabel>
              <ChipGroup id="style" chips={CHIPS.style} selected={chips.style} onToggle={toggleChip} />
              <hr className="my-4 border-neutral-100" />
              <SectionLabel>Musiqa</SectionLabel>
              <ChipGroup id="music" chips={CHIPS.music} selected={chips.music} onToggle={toggleChip} />
            </Card>

            {/* Qo'shimcha */}
            <Card index={3}>


              <SectionLabel>Qo'shimcha</SectionLabel>
              <div className="mb-3">
                <label className="text-xs text-neutral-100 mb-1 block">Joylashuv</label>
                <input name="location" value={fields.location} onChange={handleField}
                  // placeholder="Toshkent, Registon restoran"
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm bg-neutral-50/10 text-neutral-100 focus:outline-none focus:border-neutral-400" />
              </div>
              <div className="mb-4">
                <label className="text-xs text-neutral-400 mb-1 block">Maxsus talablar</label>
                <textarea name="notes" value={fields.notes} onChange={handleField}
                  // placeholder="Drone kerakmi? Highlight video? Maxsus sahnalar?"
                  rows={3}
                  className="w-full border border-neutral-100 rounded-lg px-3 py-2 text-sm text-neutral-100 bg-neutral-50/10 focus:outline-none focus:border-neutral-600 resize-none" />
              </div>




              <SectionLabel>Bujet</SectionLabel>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">Minimal ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-100">$</span>
                    <input name="budgetMin" type="number" value={fields.budgetMin} onChange={handleField}
                      placeholder="0" min="0"
                      className="w-full border border-neutral-100 rounded-lg pl-6 pr-3 py-2 text-sm text-neutral-100 bg-neutral-50/10 focus:outline-none focus:border-neutral-400" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-neutral-400 mb-1 block">Maksimal ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-100">$</span>
                    <input 
                      name="budgetMax" 
                      type="number"
                      value={fields.budgetMax} 
                      onChange={handleField}
                      placeholder="0" min="0"
                      className="w-full border border-neutral-200 rounded-lg pl-6 pr-3 py-2 text-sm text-neutral-100 bg-neutral-50/10 focus:outline-none focus:border-neutral-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-400 mb-1 block">Bujet izoh</label>
                <input 
                name="budgetNote" 
                value={fields.budgetNote} 
                onChange={handleField}
                placeholder="Muzokaraga tayyorman"
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-100 bg-neutral-50/10 focus:outline-none focus:border-neutral-400" />
              </div>
            </Card>

            {errorMsg && (
              <p className="text-sm text-red-500 mb-3 px-1">{errorMsg}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="w-full  bottom-[16px] bg-neutral-100/10 text-neutral-100 rounded-xl py-3.5 text-sm font-medium hover:bg-neutral-100 hover:text-neutral-600 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Yuborilmoqda..." : "Briefni yuborish"}
            </button>

          </div>
        </div>



        {/* ending */}

      </div>

      </div>

   </div>
  );
}
