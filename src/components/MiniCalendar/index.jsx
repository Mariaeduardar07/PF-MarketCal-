"use client";
import { useState } from "react";
import styles from "./MiniCalendar.module.css";

export default function MiniCalendar({ upcomingPosts = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date();

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Função para verificar se uma postagem tem data futura
  const isUpcoming = (scheduledAt) => {
    const postDate = new Date(scheduledAt);
    const now = new Date();
    return postDate > now;
  };

  // Contar postagens agendadas (futuras) para um dia específico
  const getPostsForDay = (day, month, year) => {
    return upcomingPosts.filter((post) => {
      if (!isUpcoming(post.scheduledAt)) return false;
      
      const postDate = new Date(post.scheduledAt);
      return (
        postDate.getDate() === day &&
        postDate.getMonth() === month &&
        postDate.getFullYear() === year
      );
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];

    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < startingDay; i++) {
      days.push({ day: null, isCurrentMonth: false, posts: [] });
    }

    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      const postsForDay = getPostsForDay(i, month, year);

      days.push({
        day: i,
        isCurrentMonth: true,
        isToday,
        posts: postsForDay,
        hasUpcomingPosts: postsForDay.length > 0,
      });
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (dayObj) => {
    if (dayObj.hasUpcomingPosts && dayObj.isCurrentMonth) {
      setSelectedDay(dayObj);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const formatDate = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (scheduledAt) => {
    const date = new Date(scheduledAt);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className={styles.calendar}>
      {/* Header do Calendário */}
      <div className={styles.header}>
        <div className={styles.monthYear}>
          <span className={styles.month}>{months[currentDate.getMonth()]}</span>
          <span className={styles.year}>{currentDate.getFullYear()}</span>
        </div>
        <div className={styles.navigation}>
          <button 
            className={styles.navBtn} 
            onClick={goToPreviousMonth}
            aria-label="Mês anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            className={styles.todayBtn} 
            onClick={goToToday}
            aria-label="Ir para hoje"
          >
            Hoje
          </button>
          <button 
            className={styles.navBtn} 
            onClick={goToNextMonth}
            aria-label="Próximo mês"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Dias da Semana */}
      <div className={styles.weekDays}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      {/* Grid de Dias */}
      <div className={styles.daysGrid}>
        {days.map((dayObj, index) => (
          <div
            key={index}
            className={`
              ${styles.day}
              ${!dayObj.isCurrentMonth ? styles.dayEmpty : ""}
              ${dayObj.isToday ? styles.dayToday : ""}
              ${dayObj.hasUpcomingPosts ? styles.dayWithPosts : ""}
            `}
            onClick={() => handleDayClick(dayObj)}
          >
            {dayObj.day && (
              <>
                <span className={styles.dayNumber}>{dayObj.day}</span>
                {dayObj.hasUpcomingPosts && (
                  <div className={styles.postBar}></div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer - Data de Hoje */}
      <div className={styles.footer}>
        <div className={styles.todayInfo}>
          <div className={styles.todayDot}></div>
          <span>
            Hoje: {today.getDate()} de {months[today.getMonth()]}
          </span>
        </div>
      </div>

      {/* Modal de Postagens do Dia */}
      {isModalOpen && selectedDay && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                Postagens de {formatDate(selectedDay.day)}
              </h3>
              <button className={styles.modalClose} onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              {selectedDay.posts.map((post, index) => (
                <div key={post.id || index} className={styles.postItem}>
                  <div className={styles.postTime}>{formatTime(post.scheduledAt)}</div>
                  <div className={styles.postContent}>
                    <div className={styles.postPlatform}>{post.platform}</div>
                    <p className={styles.postText}>{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}