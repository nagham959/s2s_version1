import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const TeamMemberCard = ({ member }) => (
  <div className="flex flex-col items-center rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-all">
    <img
      src={member.image}
      alt={member.name}
      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary/10"
    />
    <h3 className="text-text-main dark:text-white text-lg font-bold text-center mb-1">
      {member.name}
    </h3>
    <p className="text-text-sub dark:text-slate-400 text-sm text-center mb-4">
      {member.role}
    </p>
    <div className="flex gap-3">
      <a
        href={member.github}
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-text-main dark:text-white hover:bg-primary hover:text-white transition-colors"
      >
        <i className="fa-brands fa-github text-lg"></i>
      </a>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-text-main dark:text-white hover:bg-primary hover:text-white transition-colors"
      >
        <i className="fa-brands fa-linkedin text-lg"></i>
      </a>
    </div>
  </div>
);

const TeamRow = ({ members, columnsCount }) => (
  <div className="flex justify-center">
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${
      columnsCount === 3 ? 'lg:grid-cols-3 w-full lg:w-auto lg:max-w-4xl' :
      columnsCount === 2 ? 'lg:grid-cols-2 w-full lg:w-auto lg:max-w-2xl' :
      'lg:grid-cols-4 w-full'
    } gap-8`}>
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  </div>
);

const AboutPage = () => {
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';

  const teamMembers=[
    { id: 1, name: 'Mohamed Yahia', role: 'AI/ML Engineer', image: '/team/mohamed_yahia.jpeg', github: 'https://github.com/24-mohamedyehia', linkedin: 'https://www.linkedin.com/in/24-mohamed-yehia/' },
    { id: 2, name: 'Mansour Ayman', role: 'AI/ML Engineer', image: '/team/mansour_ayman.jpg', github: 'https://github.com/mansourayman', linkedin: 'https://www.linkedin.com/in/mansour-ayman-9bb046201/' },
    { id: 3, name: 'Hedra Nabil', role: 'Mobile Engineer', image: '/team/hedra_nabil.jpeg', github: 'https://github.com/Hedra-Nabil', linkedin: 'https://www.linkedin.com/in/hedra-nabil-6043221a4?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { id: 4, name: 'Ahmed Elgendy', role: 'Mobile Engineer', image: '/team/ahmed_elgendy.png', github: 'https://github.com/AhmedElgendy2004', linkedin: 'https://www.linkedin.com/in/ahmed-el-gendy-59058a2b5/' },
    { id: 5, name: 'Nagham El-Sorady', role: 'Front-End Engineer', image: '/team/nagham-elsorady.jpg', github: 'https://github.com/nagham959', linkedin: 'https://www.linkedin.com/in/nagham-elsorady-76812a3a4/' },
    { id: 6, name: 'Taha Mohamed', role: 'Front-End Engineer', image: '/team/taha_mohamed.jpg', github: 'https://github.com/Tahamohamed11', linkedin: 'https://www.linkedin.com/in/taha-mohamed-676a48330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { id: 7, name: 'Yousef Masoud', role: 'Front-End Engineer', image: '/team/yousef_masood.jpg', github: 'https://github.com/yousef-Masoud', linkedin: 'https://www.linkedin.com/in/yousef-masoud-183186252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' },
    { id: 8, name: 'Abd Alaleem El-Sayed', role: 'Backend Engineer', image: '/team/abdelaleem_elsayed.jpeg', github: 'https://github.com/AbdAlAleem-Hassan', linkedin: 'https://www.linkedin.com/in/abdalaleem-elsayed-38a387274?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { id: 9, name: 'Ahmed Omar', role: 'Backend Engineer', image: '/team/ahmed_omar.jpeg', github: 'https://github.com/ahmedomar11345', linkedin: 'https://www.linkedin.com/in/ahmed-omar-957b022b4' },
    { id: 10, name: 'Hany Mahmoud', role: 'Cybersecurity Engineer', image: '/team/hany_mahmoud.jpg', github: 'https://github.com/hanymahm0ud', linkedin: 'https://www.linkedin.com/in/hanyma77moud/' },
    { id: 11, name: 'Youssef Madkour', role: 'Malware Analyst & Reverse Engineer', image: '/team/youssef_madkour.jpeg', github: 'https://github.com/M4lB3nder', linkedin: 'https://www.linkedin.com/in/m4lb3nder/' },
    { id: 12, name: 'Nermeen Kamal', role: 'Data Analyst', image: '/team/nermeen_kamal.jpeg', github: 'https://github.com/Nermeenkamal1', linkedin: 'https://www.linkedin.com/in/nermeen-kamal?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { id: 13, name: 'Mohamed Ashraf', role: 'UI/UX Designer', image: '/team/mohamed_ashraf.jpg', github: 'https://github.com/mhamdashraf', linkedin: 'https://www.linkedin.com/in/mhamd-ashraf-8406102a0?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
  ];


  return (
    <ThemeProvider>
      <div
        dir={dir}
        className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display"
      >
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">

          {/* Hero */}
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">{t('about.hero.eyebrow')}</h2>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                {t('about.hero.title')}
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed">
                {t('about.hero.subtitle')}
              </p>
            </div>
          </section>

          {/* About Our Project */}
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[960px]">
              <div className="mb-12">
                <h2 className="text-text-main dark:text-white text-4xl font-bold mb-6">{t('about.ourStory.title')}</h2>
                <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed mb-8">
                  {t('about.ourStory.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined">visibility</span>
                    </div>
                    <div>
                      <h3 className="text-text-main dark:text-white text-xl font-bold mb-2">{t('about.ourStory.visionTitle')}</h3>
                      <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">
                        {t('about.ourStory.visionDescription')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined">flag</span>
                    </div>
                    <div>
                      <h3 className="text-text-main dark:text-white text-xl font-bold mb-2">{t('about.ourStory.missionTitle')}</h3>
                      <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">
                        {t('about.ourStory.missionDescription')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-20 px-6 lg:px-40 bg-background-alt dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-[1280px]">
              <div className="text-center mb-12">
                <h2 className="text-text-main dark:text-white text-4xl font-bold mb-6">{t('about.team.title')}</h2>
              </div>

              {/* Team Description */}
              <div className="mb-16 max-w-[960px] mx-auto">
              </div>

              {/* Team Grid */}
              <div className="space-y-8">
                {/* Rows 1-2: 4 columns each */}
                {[0, 1].map((rowIndex) => (
                  <div key={`row-${rowIndex}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.slice(rowIndex * 4, rowIndex * 4 + 4).map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                ))}

                {/* Row 3: 3 columns - centered */}
                <TeamRow members={teamMembers.slice(8, 11)} columnsCount={3} />

                {/* Row 4: 2 columns - centered */}
                <TeamRow members={teamMembers.slice(11, 13)} columnsCount={2} />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <h2 className="text-text-main dark:text-white text-3xl font-bold mb-4">{t('about.cta.title')}</h2>
            <p className="text-text-sub dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">{t('about.cta.description')}</p>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center rounded-xl h-14 px-10 bg-primary text-white text-lg font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
            >
              {t('about.cta.primary')}
            </button>
          </section>

        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default AboutPage;
