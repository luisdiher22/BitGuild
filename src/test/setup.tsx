import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/image — jsdom has no browser image APIs
vi.mock("next/image", () => ({
  default: ({ src, alt, style, onError, width, height }: React.ImgHTMLAttributes<HTMLImageElement> & { onError?: () => void }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt} style={style} width={width} height={height} onError={onError} />
  ),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn(),
}));
