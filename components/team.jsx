import AOSWrapper from "@/components/AOSProvider"; // sesuaikan path
import Link from "next/link";

// Data anggota tim
const members = [
  {
    name: "Fadli Hifziansyah",
    role: "UI/UX & Integrator",
    avatar: "https://alt.tailus.io/images/team/member-one.webp",
    link: "#",
  },
  {
    name: "Azka Maulana",
    role: "AI Specialist & Frontend",
    avatar: "https://alt.tailus.io/images/team/member-two.webp",
    link: "#",
  },
  {
    name: "Nasywan",
    role: "Project Planner & Backend",
    avatar: "https://alt.tailus.io/images/team/member-three.webp",
    link: "#",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-zinc-50 dark:bg-violet-950/20 py-16 md:py-32">
      <AOSWrapper>
        <div className="mx-auto max-w-5xl border-t px-6">
          <span className="text-caption -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950" data-aos="fade-up">
            Tim Kami
          </span>

          <div className="mt-12 gap-4 sm:grid sm:grid-cols-2 md:mt-24" data-aos="fade-up" data-aos-delay="100">
            <div className="sm:w-2/5">
              <h2 className="text-3xl font-bold sm:text-4xl">Dream Team ❤️</h2>
            </div>
            <div className="mt-6 sm:mt-0 text-muted-foreground">
              <p>Kami adalah tim pengembang muda yang berkomitmen untuk menciptakan solusi AI yang bermakna dan manusiawi untuk kesehatan emosional kamu.</p>
            </div>
          </div>

          <div className="mt-12 md:mt-24 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div key={index} className="group overflow-hidden" data-aos="fade-up" data-aos-delay={200 + index * 100}>
                <img
                  className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                  src={member.avatar}
                  alt={member.name}
                  width="826"
                  height="1239"
                />
                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                  <div className="flex justify-between">
                    <h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">{member.name}</h3>
                    <span className="text-xs">_0{index + 1}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">{member.role}</span>
                    <Link
                      href={member.link}
                      className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      Linktree
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AOSWrapper>
    </section>
  );
}
