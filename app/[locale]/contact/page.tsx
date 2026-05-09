'use client';

import { useState } from 'react';

const translations = {
  ar: {
    title: '📞 اتصل بنا',
    subtitle: 'نحن هنا لمساعدتك',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    send: '📨 إرسال',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال رسالتك بنجاح!',
    emailUs: '📧 راسلنا مباشرة'
  },
  en: {
    title: '📞 Contact Us',
    subtitle: 'We are here to help you',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: '📨 Send',
    sending: 'Sending...',
    success: 'Your message has been sent successfully!',
    emailUs: '📧 Email us directly'
  },
  de: {
    title: '📞 Kontakt',
    subtitle: 'Wir sind hier, um Ihnen zu helfen',
    name: 'Name',
    email: 'E-Mail',
    message: 'Nachricht',
    send: '📨 Senden',
    sending: 'Wird gesendet...',
    success: 'Ihre Nachricht wurde gesendet!',
    emailUs: '📧 E-Mail uns direkt'
  },
  fr: {
    title: '📞 Contactez-nous',
    subtitle: 'Nous sommes là pour vous aider',
    name: 'Nom',
    email: 'E-mail',
    message: 'Message',
    send: '📨 Envoyer',
    sending: 'Envoi...',
    success: 'Votre message a été envoyé !',
    emailUs: '📧 Envoyez-nous un e-mail'
  },
  es: {
    title: '📞 Contáctenos',
    subtitle: 'Estamos aquí para ayudarte',
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Mensaje',
    send: '📨 Enviar',
    sending: 'Enviando...',
    success: '¡Mensaje enviado con éxito!',
    emailUs: '📧 Envíanos un correo'
  }
};

export default function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const isRTL = locale === 'ar';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  return (
    <div className="container-custom animate-fade-in-up" style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="tool-card-single">
        <h1 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '0.5rem', textAlign: isRTL ? 'right' : 'left' }}>{t.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: isRTL ? 'right' : 'left' }}>{t.subtitle}</p>
        
        <div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', textAlign: isRTL ? 'right' : 'left' }}>{t.name}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.8rem', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--input-text)', textAlign: isRTL ? 'right' : 'left' }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', textAlign: isRTL ? 'right' : 'left' }}>{t.email}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.8rem', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--input-text)', textAlign: isRTL ? 'right' : 'left' }}
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', textAlign: isRTL ? 'right' : 'left' }}>{t.message}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.8rem', border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--input-text)', resize: 'vertical', textAlign: isRTL ? 'right' : 'left' }}
              />
            </div>
            
            <button type="submit" className="btn" style={{ width: '100%' }} disabled={status === 'sending'}>
              {status === 'sending' ? t.sending : t.send}
            </button>
            
            {status === 'success' && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(46, 125, 50, 0.2)', borderRadius: '0.8rem', textAlign: 'center', color: '#4caf50' }}>
                {t.success}
              </div>
            )}
          </form>
          
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: isRTL ? 'right' : 'center' }}>
            <p style={{ marginBottom: '1rem', textAlign: isRTL ? 'right' : 'center' }}>{t.emailUs}</p>
            <a href="mailto:info@toolkitpro.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.2rem' }}>info@toolkitpro.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}