import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useCategoryInteractions from './useCategoryInteractions.js';
import useScopedCss from '@/hooks/useScopedCss.js';
import pageStyles from '@/assets/css/pages/categories/eyes.css?inline';

const Eyes = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    document.title = 'Eyes - Mosaic Beauty';
  }, []);

  useScopedCss(pageStyles, 'eyes-page');
  useCategoryInteractions(pageRef);

  return (
    <main ref={pageRef}>
      <nav className="sub-navbar">
        <ul className="sub-nav-links">
          <li>
            <a href="#eyeliner">EYELINER</a>
          </li>
          <li>
            <a href="#eyeshadow">EYESHADOW</a>
          </li>
          <li>
            <a href="#lashes">LASHES</a>
          </li>
          <li>
            <a href="#brows">BROWS</a>
          </li>
        </ul>
      </nav>
      <div className="page-intro">
        <h2>EYES</h2>
      </div>

      <section className="aesthetic-images-section">
        <div className="aesthetic-image-card">
          <img src="/assets/images/categories/eyes/aesthetic_left.jpg" alt="Aesthetic Eye Shot 1" style={{ height: '85%' }} />
        </div>
        <div className="aesthetic-image-card">
          <img src="/assets/images/categories/eyes/aesthetic_1.jpg" alt="Aesthetic Eye Shot 2" style={{ height: '85%' }} />
        </div>
        <div className="aesthetic-image-card">
          <img src="/assets/images/categories/eyes/aesthetic_3.jpg" alt="Aesthetic Eye Shot 3" style={{ height: '85%' }} />
        </div>
      </section>

      <section className="product-category" id="eyeliner">
        <div className="category-intro-card">
          <img src="/assets/images/categories/eyes/liner_description.jpg" alt="Eyeliner" />
          <div className="card-content">
            <h3>Eyeliner</h3>
            <p>
              From precise lines to smoky eyes, our eyeliners are designed for effortless application and all-day wear.
            </p>
          </div>
        </div>
        <div className="product-scroller-container">
          <div className="scroller-header">
            <div className="scroller-arrows">
              <button className="arrow left-arrow" type="button" aria-label="Scroll products left">
                <i className="fas fa-chevron-left" />
              </button>
              <button className="arrow right-arrow" type="button" aria-label="Scroll products right">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
          <div className="product-scroller">
            <div className="product-card">
              <img src="/assets/images/categories/eyes/mac_eyeliner.avif" alt="M.A.C Liquidlast Eyeliner" />
              <div className="product-info">
                <span className="product-name">M.A.C Liquidlast Eyeliner - Point Black(2.5ml)</span>
                <span className="product-desc">Flawless, jet black lines that last all day.</span>
                <button className="add-to-bag-btn" type="button">
                  BUY FOR ₹3100
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/Maybelline_new_york_eyeliner.avif"
                alt="Maybelline New York Lasting Drama Gel Eyeliner"
              />
              <div className="product-info">
                <span className="product-name">Maybelline New York Lasting Drama Gel Eyeliner(2.5g)</span>
                <span className="product-desc">Smudge-proof drama for eyes that demand attention.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹1200
                </button>
              </div>
            </div>
            <div className="product-card">
              <img src="/assets/images/categories/eyes/multi_tasker_line.avif" alt="Multi-Tasker Line & Detail Eyeliner Pen" />
              <div className="product-info">
                <span className="product-name">Multi-Tasker Line & Detail Eyeliner Pen - Black (0.7ml)</span>
                <span className="product-desc">One pen, two perfect tips for every look.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹700
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/revolution_streamline.avif"
                alt="Revolution Streamline Waterline Eyeliner Pencil"
              />
              <div className="product-info">
                <span className="product-name">Revolution Streamline Waterline Eyeliner Pencil - Brown (1.3g)</span>
                <span className="product-desc">Effortless glide for an intense, smoky eye look.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹400
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-category" id="eyeshadow">
        <div className="category-intro-card">
          <img src="/assets/images/categories/eyes/shadows.jpg" alt="Eyeshadow" />
          <div className="card-content">
            <h3>Eyeshadow</h3>
            <p>
              Elevate your look with our smooth, blendable eyeshadows in a variety of stunning finishes.
            </p>
          </div>
        </div>
        <div className="product-scroller-container">
          <div className="scroller-header">
            <div className="scroller-arrows">
              <button className="arrow left-arrow" type="button" aria-label="Scroll products left">
                <i className="fas fa-chevron-left" />
              </button>
              <button className="arrow right-arrow" type="button" aria-label="Scroll products right">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
          <div className="product-scroller">
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/nude_obsessions.avif"
                alt="Huda Beauty Nude Obsessions Eye Shadow Palette"
              />
              <div className="product-info">
                <span className="product-name">
                  Huda Beauty Nude Obsessions Eye Shadow Palette - Medium (9.9g)
                </span>
                <span className="product-desc">A must-have palette for your everyday nude addiction.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹2915
                </button>
              </div>
            </div>
            <div className="product-card">
              <img src="/assets/images/categories/eyes/shelgam_berry_palate.avif" alt="Sheglam Berry Palette" />
              <div className="product-info">
                <span className="product-name">Sheglam Berry Palette - Berry (10.5g)</span>
                <span className="product-desc">Rich berry tones to make your eyes pop.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹999
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/makeup_revolution.avif"
                alt="Makeup Revolution Forever Flawless Palette"
              />
              <div className="product-info">
                <span className="product-name">
                  Makeup Revolution Forever Flawless Palette - Bronze Temptation (19.8g)
                </span>
                <span className="product-desc">Gilded bronze tones for endless, flawless looks.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹1600
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/creamy_obsessions.avif"
                alt="Huda Beauty Creamy Obsessions Eyeshadow Palette"
              />
              <div className="product-info">
                <span className="product-name">
                  Huda Beauty Creamy Obsessions Eyeshadow Palette - Brown (8.22g)
                </span>
                <span className="product-desc">Creamy, blendable formula for a flawless, rich brown eye.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹2600
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-category" id="lashes">
        <div className="category-intro-card">
          <img
            src="/assets/images/categories/eyes/lashes_description.jpg"
            alt="Lashes"
            className="lashes-promo-image"
          />
          <div className="card-content">
            <h3>Lashes</h3>
            <p>
              Elevate your natural lashes or add a touch of drama with our selection of falsies and lash tools.
            </p>
          </div>
        </div>
        <div className="product-scroller-container">
          <div className="scroller-header">
            <div className="scroller-arrows">
              <button className="arrow left-arrow" type="button" aria-label="Scroll products left">
                <i className="fas fa-chevron-left" />
              </button>
              <button className="arrow right-arrow" type="button" aria-label="Scroll products right">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
          <div className="product-scroller">
            <div className="product-card">
              <img src="/assets/images/categories/eyes/bestie_2_in_one.avif" alt="Lash Bestie 2-in-one" />
              <div className="product-info">
                <span className="product-name">Lash Bestie 2-in-one (8.7ml)</span>
                <span className="product-desc">Your secret for longer, thicker, and fuller lashes.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹599
                </button>
              </div>
            </div>
            <div className="product-card">
              <img src="/assets/images/categories/eyes/kiko_milano_lashes.avif" alt="KIKO Milano New Volumeyes+ Mascara" />
              <div className="product-info">
                <span className="product-name">KIKO Milano New Volumeyes+ Mascara (11 ml)</span>
                <span className="product-desc">Instant volume for bold, dramatic, show-stopping lashes.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹945
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/bronson_professional_long.avif"
                alt="Bronson Professional Long & Natural False Eyelashes"
              />
              <div className="product-info">
                <span className="product-name">Bronson Professional Long & Natural False Eyelashes</span>
                <span className="product-desc">Long, natural-looking lashes for a captivating gaze.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹200
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/two_faced_better_than_your_ex.avif"
                alt="Too Faced Better Than Your Ex Mascara"
              />
              <div className="product-info">
                <span className="product-name">Too Faced Better Than Your Ex Mascara - Black (4.8g)</span>
                <span className="product-desc">False lash effect that's better than anything.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹1450
                </button>
              </div>
            </div>
            <div className="product-card">
              <img src="/assets/images/categories/eyes/swiss_beauty_pro.avif" alt="Swiss Beauty Pro Eyelash Glue" />
              <div className="product-info">
                <span className="product-name">Swiss Beauty Pro Eyelash Glue - Black (5ml)</span>
                <span className="product-desc">Keeps your falsies in place all day.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹400
                </button>
              </div>
            </div>
            <div className="product-card">
              <img src="/assets/images/categories/eyes/huda_beauty_classic_lashes.avif" alt="Huda Beauty Classic False Lashes" />
              <div className="product-info">
                <span className="product-name">Huda Beauty Classic False Lashes</span>
                <span className="product-desc">The ultimate accessory for dramatic, beautiful eyes.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹800
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-category" id="brows">
        <div className="category-intro-card">
          <img src="/assets/images/categories/eyes/brows_description.jpg" alt="Brows" className="brows-promo-image" />
          <div className="card-content">
            <h3>Brows</h3>
            <p>
              Shape and define your brows with our collection of pencils, gels, and powders for a polished finish.
            </p>
          </div>
        </div>
        <div className="product-scroller-container">
          <div className="scroller-header">
            <div className="scroller-arrows">
              <button className="arrow left-arrow" type="button" aria-label="Scroll products left">
                <i className="fas fa-chevron-left" />
              </button>
              <button className="arrow right-arrow" type="button" aria-label="Scroll products right">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
          <div className="product-scroller">
            <div className="product-card">
              <img src="/assets/images/categories/eyes/shelgam_brown_pencil.avif" alt="Sheglam Insta-Fill Brow Pencil" />
              <div className="product-info">
                <span className="product-name">Sheglam Insta-Fill Brow Pencil - Dark Brown (0.05 g)</span>
                <span className="product-desc">
                  Effortlessly create perfect, defined brows with this pencil.
                </span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹400
                </button>
              </div>
            </div>
            <div className="product-card">
              <img src="/assets/images/categories/eyes/boss_brow.avif" alt="Boss Brow Waterproof Pomade" />
              <div className="product-info">
                <span className="product-name">Boss Brow Waterproof Pomade - Dark Brown (3.5 g)</span>
                <span className="product-desc">Sculpted, bold brows that last through anything.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹700
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/benefit_cosmetics.avif"
                alt="Benefit Cosmetics Precisely, My Brow Wax"
              />
              <div className="product-info">
                <span className="product-name">
                  Benefit Cosmetics Precisely, My Brow Wax - 6 Cool Soft Black (5 g)
                </span>
                <span className="product-desc">Shape and hold brows for a defined, lasting look.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹2800
                </button>
              </div>
            </div>
            <div className="product-card">
              <img
                src="/assets/images/categories/eyes/fenty_beauty_brow.avif"
                alt="FENTY BEAUTY Brow Mvp Ultra Fine Brow Pencil & Styler"
              />
              <div className="product-info">
                <span className="product-name">
                  FENTY BEAUTY Brow Mvp Ultra Fine Brow Pencil & Styler - Dark Brown (0.07 g)
                </span>
                <span className="product-desc">Define and style your brows with ultra-precision.</span>
                <button className="add-to-bag-btn" type="button">
                  ADD TO BAG ₹2000
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="back-to-categories">
        <Link to="/categories" className="back-link">
          ← Back to Categories
        </Link>
      </div>
    </main>
  );
};

export default Eyes;

