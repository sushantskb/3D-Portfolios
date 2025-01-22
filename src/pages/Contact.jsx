import { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";

import Loader from "../components/Loader";
import Fox from "../models/Fox";
import { FaCheck } from "react-icons/fa";
const Contact = () => {
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = () => {
    setCurrentAnimation("idle");
  };

  const handleFocus = () => {
    setCurrentAnimation("walk");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    try {
      const url = import.meta.env.VITE_APP_URL;
      const resp = await fetch(`${url}/api~v1/contact/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await resp.json();

      if (data.success) {
        setSent(true);
        setTimeout(() => {
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
          setSent(false);
        }, [3000]);
      }
    } catch (error) {
      setTimeout(() => {
        setCurrentAnimation("idle");
        setForm({ name: "", email: "", message: "" });
        setSent(false);
      }, [3000]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: "url('/bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-black/30 z-10"></div>
      <section className=" relative flex lg:flex-row flex-col max-container z-20">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <h1
            className="head-text text-slate-300"
            style={{ textShadow: "2px 2px 4px black" }}>
            Get in Touch
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-7 mt-14">
            <label className="text-slate-200 font-semibold">
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Sushant Bishoi"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-slate-200 font-semibold">
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="sushantbishoi.developer@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="text-slate-200 font-semibold">
              Your Message
              <textarea
                name="message"
                rows="4"
                className="textarea"
                placeholder="Write your thoughts here..."
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            {sent ? (
              <button
                disabled={true}
                className={` flex items-center justify-center gap-1 !text-xl ${
                  sent ? "bg-gray-500 p-2 rounded-xl text-white" : "btn"
                }`}
                onFocus={handleFocus}
                onBlur={handleBlur}>
                <span className="bg-green-500 rounded-full p-[4px]">
                  <FaCheck size={8} />
                </span>{" "}
                Sent
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="btn"
                onFocus={handleFocus}
                onBlur={handleBlur}>
                {loading ? "Sending..." : "Submit"}
              </button>
            )}
          </form>
        </div>

        <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 75,
              near: 0.1,
              far: 1000,
            }}>
            <directionalLight intensity={2.5} position={[0, 0, 1]} />
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimations={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.6, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default Contact;
