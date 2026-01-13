// Main, About 페이지용 Footer (fullpage-scroll 방식, 섹션 내 스크롤)
function FullpageFooter() {
  return (
    <section id="footer" className="fullpage-footer">
      <div className="footer-content-main">
        <h2 className="footer-headline">We are waiting for you to contact us</h2>
        <p className="footer-subheadline">You can write to us at any time and get an instant response.</p>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1582.4434942359923!2d126.89562207639486!3d37.51548197204086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9ec78f66e777%3A0x9c6e5c8e6a3b0e1a!2sKnK%EB%94%94%EC%A7%80%ED%84%B8%ED%83%80%EC%9B%8C!5e0!3m2!1sko!2skr!4v1704934800000!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">ADDRESS</span>
            <span className="contact-value">서울 영등포구 영신로 220 KnK디지털타워 604호</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">PHONE</span>
            <span className="contact-value">02-323-9030</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">E-MAIL</span>
            <span className="contact-value">info@irush.co.kr</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">COPYRIGHT 2026. IRUSH. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </section>
  );
}

export default FullpageFooter;
