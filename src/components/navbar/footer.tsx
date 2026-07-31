import { FluidGradientText } from "@/components/fluid-gradient-text";

export const Footer = () => (
  <footer className="view-container mt-auto animate-slide-in px-0 pb-8 pt-0">
    <div className="site-wordmark-section" aria-hidden>
      <div className="site-wordmark-wrap">
        <FluidGradientText
          text="Jay Rana"
          svgViewBoxWidth={1400}
          svgViewBoxHeight={340}
        />
      </div>
    </div>
    <div className="screen-line-top footer-meta">
      <p>Last updated · Jul 31, 2026</p>
      <p>&copy; {new Date().getFullYear()} Jay Rana</p>
    </div>
    <p className="footer-attribution">Inspired by <a href="https://www.amansagar.in/" target="_blank" rel="noreferrer">Aman Sagar</a>&apos;s original portfolio design.</p>
  </footer>
);
