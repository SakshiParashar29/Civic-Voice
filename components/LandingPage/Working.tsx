"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  UserCheck,
  FileEdit,
  ClipboardList,
  Wrench,
  CheckCircle
} from "lucide-react"

const steps = [
  {
    icon: <UserCheck size={45} />,
    title: "Login or Register",
    desc: "Create your account to start reporting issues in your locality.",
  },
  {
    icon: <FileEdit size={45} />,
    title: "File a Complaint",
    desc: "Submit details, upload images, and describe the issue clearly.",
  },
  {
    icon: <ClipboardList size={45} />,
    title: "Municipality Reviews",
    desc: "Your complaint is reviewed and assigned to the right department.",
  },
  {
    icon: <Wrench size={45} />,
    title: "Work Starts",
    desc: "Your municipality begins taking action on the issue.",
  },
  {
    icon: <CheckCircle size={45} />,
    title: "Issue Resolved",
    desc: "Track real-time progress until the issue is officially closed.",
  },
]

const Working = () => {
  return (
    <div className="py-20 w-full">
      <h2 className="text-4xl dark:text-white text-center font-bold mb-14">
        How <span className="text-orange-600">It Works</span>
      </h2>

      <div className="flex flex-col md:flex-row md:justify-center md:gap-10 mx-auto w-full max-w-5xl">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center px-6 py-6 md:w-1/5"
          >
            <div className="p-6 rounded-full bg-orange-100 dark:bg-gray-500 shadow-md mb-4">
              {step.icon}
            </div>

            <h3 className="text-xl text-orange-500 font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>

          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Working
