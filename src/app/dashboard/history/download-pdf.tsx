"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DownloadPDFProps = {
  data: {
    id: string;
    title: string;
    npa: string[];
    status: "done" | "error" | "inProcess";
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string;
  };
};

export const DownloadPDF: React.FC<DownloadPDFProps> = ({ data }) => {
  const [trigger, fetchTechnicalSpecification] = useState(false);
  const { data: technicalSpecification } =
    api.technicalSpecification.getById.useQuery(
      { id: data.id },
      { enabled: trigger },
    );

  const [isConverting, setIsConverting] = useState(false);
  const [cssContent, setCssContent] = useState("");

  // Fetch and process CSS files on component mount
  useEffect(() => {
    const fetchCssFiles = async () => {
      try {
        const cssTexts = await Promise.all([
          `
:root {
  --mt-overlay: rgba(251, 251, 251, 0.75);
  --mt-transparent-foreground: rgba(0, 0, 0, 0.4);
  --mt-bg-secondary: rgba(251, 251, 251, 0.8);
  --mt-code-background: #082b781f;
  --mt-code-color: #d4d4d4;
  --mt-secondary: #9d9d9f;
  --mt-pre-background: #ececec;
  --mt-pre-border: #e0e0e0;
  --mt-pre-color: #2f2f31;
  --mt-hr: #dcdcdc;
  --mt-drag-handle-hover: #5c5c5e;

  --mt-accent-bold-blue: #05c;
  --mt-accent-bold-teal: #206a83;
  --mt-accent-bold-green: #216e4e;
  --mt-accent-bold-orange: #a54800;
  --mt-accent-bold-red: #ae2e24;
  --mt-accent-bold-purple: #5e4db2;

  --mt-accent-gray: #758195;
  --mt-accent-blue: #1d7afc;
  --mt-accent-teal: #2898bd;
  --mt-accent-green: #22a06b;
  --mt-accent-orange: #fea362;
  --mt-accent-red: #c9372c;
  --mt-accent-purple: #8270db;

  --mt-accent-blue-subtler: #cce0ff;
  --mt-accent-teal-subtler: #c6edfb;
  --mt-accent-green-subtler: #baf3db;
  --mt-accent-yellow-subtler: #f8e6a0;
  --mt-accent-red-subtler: #ffd5d2;
  --mt-accent-purple-subtler: #dfd8fd;

  --hljs-string: #aa430f;
  --hljs-title: #b08836;
  --hljs-comment: #999999;
  --hljs-keyword: #0c5eb1;
  --hljs-attr: #3a92bc;
  --hljs-literal: #c82b0f;
  --hljs-name: #259792;
  --hljs-selector-tag: #c8500f;
  --hljs-number: #3da067;
}

.dark {
  --mt-overlay: rgba(31, 32, 35, 0.75);
  --mt-transparent-foreground: rgba(255, 255, 255, 0.4);
  --mt-bg-secondary: rgba(31, 32, 35, 0.8);
  --mt-code-background: #ffffff13;
  --mt-code-color: #2c2e33;
  --mt-secondary: #595a5c;
  --mt-pre-background: #080808;
  --mt-pre-border: #23252a;
  --mt-pre-color: #e3e4e6;
  --mt-hr: #26282d;
  --mt-drag-handle-hover: #969799;

  --mt-accent-bold-blue: #85b8ff;
  --mt-accent-bold-teal: #9dd9ee;
  --mt-accent-bold-green: #7ee2b8;
  --mt-accent-bold-orange: #fec195;
  --mt-accent-bold-red: #fd9891;
  --mt-accent-bold-purple: #b8acf6;

  --mt-accent-gray: #738496;
  --mt-accent-blue: #388bff;
  --mt-accent-teal: #42b2d7;
  --mt-accent-green: #2abb7f;
  --mt-accent-orange: #a54800;
  --mt-accent-red: #e2483d;
  --mt-accent-purple: #8f7ee7;

  --mt-accent-blue-subtler: #09326c;
  --mt-accent-teal-subtler: #164555;
  --mt-accent-green-subtler: #164b35;
  --mt-accent-yellow-subtler: #533f04;
  --mt-accent-red-subtler: #5d1f1a;
  --mt-accent-purple-subtler: #352c63;

  --hljs-string: #da936b;
  --hljs-title: #f1d59d;
  --hljs-comment: #aaaaaa;
  --hljs-keyword: #6699cc;
  --hljs-attr: #90cae8;
  --hljs-literal: #f2777a;
  --hljs-name: #5fc0a0;
  --hljs-selector-tag: #e8c785;
  --hljs-number: #b6e7b6;
}

.minimal-tiptap-editor .ProseMirror {
  @apply flex max-w-full cursor-text flex-col;
  @apply z-0 outline-0;
}

.minimal-tiptap-editor .ProseMirror > div.editor {
  @apply block flex-1 whitespace-pre-wrap;
}

.minimal-tiptap-editor .ProseMirror .block-node:not(:last-child),
.minimal-tiptap-editor .ProseMirror .list-node:not(:last-child),
.minimal-tiptap-editor .ProseMirror .text-node:not(:last-child) {
  @apply mb-2.5;
}

.minimal-tiptap-editor .ProseMirror ol,
.minimal-tiptap-editor .ProseMirror ul {
  @apply pl-6;
}

.minimal-tiptap-editor .ProseMirror blockquote,
.minimal-tiptap-editor .ProseMirror dl,
.minimal-tiptap-editor .ProseMirror ol,
.minimal-tiptap-editor .ProseMirror p,
.minimal-tiptap-editor .ProseMirror pre,
.minimal-tiptap-editor .ProseMirror ul {
  @apply m-0;
}

.minimal-tiptap-editor .ProseMirror li {
  @apply leading-7;
}

.minimal-tiptap-editor .ProseMirror p {
  @apply break-words;
}

.minimal-tiptap-editor .ProseMirror li .text-node:has(+ .list-node),
.minimal-tiptap-editor .ProseMirror li > .list-node,
.minimal-tiptap-editor .ProseMirror li > .text-node,
.minimal-tiptap-editor .ProseMirror li p {
  @apply mb-0;
}

.minimal-tiptap-editor .ProseMirror blockquote {
  @apply relative pl-3.5;
}

.minimal-tiptap-editor .ProseMirror blockquote::before,
.minimal-tiptap-editor .ProseMirror blockquote.is-empty::before {
  @apply bg-accent-foreground/15 absolute top-0 bottom-0 left-0 h-full w-1 rounded-sm content-[''];
}

.minimal-tiptap-editor .ProseMirror hr {
  @apply my-3 h-0.5 w-full border-none bg-[var(--mt-hr)];
}

.minimal-tiptap-editor .ProseMirror-focused hr.ProseMirror-selectednode {
  @apply outline-muted-foreground rounded-full outline outline-2 outline-offset-1;
}

.minimal-tiptap-editor .ProseMirror .ProseMirror-gapcursor {
  @apply pointer-events-none absolute hidden;
}

.minimal-tiptap-editor .ProseMirror .ProseMirror-hideselection {
  @apply caret-transparent;
}

.minimal-tiptap-editor .ProseMirror.resize-cursor {
  @apply cursor-col-resize;
}

.minimal-tiptap-editor .ProseMirror .selection {
  @apply inline-block;
}

.minimal-tiptap-editor .ProseMirror s span {
  @apply line-through;
}

.minimal-tiptap-editor .ProseMirror .selection,
.minimal-tiptap-editor .ProseMirror *::selection,
::selection {
  @apply bg-accent;
}

/* Override native selection when custom selection is present */
.minimal-tiptap-editor .ProseMirror .selection::selection {
  background: transparent;
}
`,
          `
.minimal-tiptap-editor .ProseMirror .heading-node {
  @apply relative font-semibold;
}

.minimal-tiptap-editor .ProseMirror .heading-node:first-child {
  @apply mt-0;
}

.minimal-tiptap-editor .ProseMirror h1 {
  @apply mt-[46px] mb-4 text-[1.375rem] leading-7 tracking-[-0.004375rem];
}

.minimal-tiptap-editor .ProseMirror h2 {
  @apply mt-8 mb-3.5 text-[1.1875rem] leading-7 tracking-[0.003125rem];
}

.minimal-tiptap-editor .ProseMirror h3 {
  @apply mt-6 mb-3 text-[1.0625rem] leading-6 tracking-[0.00625rem];
}

.minimal-tiptap-editor .ProseMirror h4 {
  @apply mt-4 mb-2 text-[0.9375rem] leading-6;
}

.minimal-tiptap-editor .ProseMirror h5 {
  @apply mt-4 mb-2 text-sm;
}

.minimal-tiptap-editor .ProseMirror h5 {
  @apply mt-4 mb-2 text-sm;
}

.minimal-tiptap-editor .ProseMirror a.link {
  @apply text-primary cursor-pointer;
}

.minimal-tiptap-editor .ProseMirror a.link:hover {
  @apply underline;
}
`,
        ]);

        // Process and combine CSS
        let combinedCss = cssTexts.join("\n");

        combinedCss = combinedCss.replace(/@apply([^;]*);/g, (match, props) => {
          let css = "";

          if (props.includes("rounded-sm")) css += "border-radius: 0.125rem;";
          if (props.includes("border")) css += "border: 1px solid;";
          if (props.includes("px-1"))
            css += "padding-left: 0.25rem; padding-right: 0.25rem;";
          if (props.includes("py-0.5"))
            css += "padding-top: 0.125rem; padding-bottom: 0.125rem;";
          if (props.includes("text-sm"))
            css += "font-size: 0.875rem; line-height: 1.25rem;";
          if (props.includes("font-semibold")) css += "font-weight: 600;";
          if (props.includes("relative")) css += "position: relative;";
          if (props.includes("mt-0")) css += "margin-top: 0;";
          if (props.includes("mb-4")) css += "margin-bottom: 1rem;";
          if (props.includes("list-decimal"))
            css += "list-style-type: decimal;";
          if (props.includes("pl-6")) css += "padding-left: 1.5rem;";

          return css;
        });

        // Set the processed CSS
        setCssContent(combinedCss);
      } catch (error) {
        console.error("Error fetching CSS files:", error);
      }
    };

    fetchCssFiles();
  }, []);

  const convertToPdf = async () => {
    setIsConverting(true);
    fetchTechnicalSpecification(true);

    toast(<span>Начинаем создание PDF</span>, {
      description: "Пожалуйста, подождите, пока мы создаем ваш PDF...",
      duration: 3000,
    });
  };

  useEffect(() => {
    if (!technicalSpecification || !isConverting) return;

    setTimeout(async () => {
      try {
        // Import the libraries
        const jspdf = await import("jspdf");
        // Use html2canvas-pro instead of html2canvas for oklch support
        const html2canvasPro = await import("html2canvas-pro");

        // Create a new jsPDF instance
        const pdf = new jspdf.default("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Create a temporary container for the content
        const container = document.createElement("div");

        // TODO: Add content from the database
        const HTML_CONTENT = technicalSpecification.description;

        // Add the minimal-tiptap-editor class to enable the CSS
        container.className = "minimal-tiptap-editor";
        container.innerHTML = `<div class="ProseMirror">${HTML_CONTENT}</div>`;

        // Set a fixed width that matches A4 proportions but don't set height
        container.style.width = "210mm"; // A4 width
        container.style.margin = "0";
        container.style.padding = "10mm";
        container.style.boxSizing = "border-box";
        container.style.position = "absolute";
        container.style.left = "-9999px";
        document.body.appendChild(container);

        // Apply the fetched CSS
        const style = document.createElement("style");
        style.textContent = cssContent;
        container.prepend(style);

        // Add additional basic styles to ensure proper rendering
        const additionalStyle = document.createElement("style");
        additionalStyle.textContent = `
          .minimal-tiptap-editor .ProseMirror {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
          }
          
          .minimal-tiptap-editor .ProseMirror h1 {
            font-size: 24px;
            font-weight: bold;
            margin-top: 24px;
            margin-bottom: 16px;
          }
          
          .minimal-tiptap-editor .ProseMirror h2 {
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 12px;
          }
          
          .minimal-tiptap-editor .ProseMirror p {
            margin-bottom: 16px;
          }
          
          .minimal-tiptap-editor .ProseMirror ul, 
          .minimal-tiptap-editor .ProseMirror ol {
            padding-left: 24px;
            margin-bottom: 16px;
          }
          
          .minimal-tiptap-editor .ProseMirror li {
            margin-bottom: 4px;
          }
          
          .minimal-tiptap-editor .ProseMirror blockquote {
            border-left: 4px solid #ddd;
            padding-left: 16px;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
          }
          
          .minimal-tiptap-editor .ProseMirror code {
            background-color: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
          }
          
          .minimal-tiptap-editor .ProseMirror pre {
            background-color: #f5f5f5;
            padding: 12px;
            border-radius: 3px;
            overflow-x: auto;
          }
          
          .minimal-tiptap-editor .ProseMirror .heading-node {
            color: #3b82f6;
            font-weight: 600;
          }
        `;
        container.prepend(additionalStyle);

        const html = document.querySelector("html")!;
        const darkTheme = html.classList.contains("dark");
        if (darkTheme) {
          document.querySelector("html")?.classList.remove("dark");
        }
        console.log(cssContent);
        // Render the HTML to canvas with optimized settings using html2canvas-pro
        const canvas = await html2canvasPro.default(container, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });

        if (darkTheme) {
          document.querySelector("html")?.classList.add("dark");
        }

        // Calculate the proper dimensions to maintain aspect ratio
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Check if content exceeds a single page
        let position = 0;

        // If the content fits on a single page
        if (imgHeight <= pdfHeight) {
          // Add the canvas as an image to the PDF, centered vertically
          const yPosition = (pdfHeight - imgHeight) / 2;
          pdf.addImage(
            canvas.toDataURL("image/jpeg", 0.95),
            "JPEG",
            0,
            yPosition,
            imgWidth,
            imgHeight,
          );
        } else {
          // Handle multi-page content
          let heightLeft = imgHeight;
          const pageHeight = pdfHeight;

          // For the first page
          pdf.addImage(
            canvas.toDataURL("image/jpeg", 0.95),
            "JPEG",
            0,
            0,
            imgWidth,
            imgHeight,
          );
          heightLeft -= pageHeight;

          // Add new pages if needed
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(
              canvas.toDataURL("image/jpeg", 0.95),
              "JPEG",
              0,
              position,
              imgWidth,
              imgHeight,
            );
            heightLeft -= pageHeight;
          }
        }

        // Save the PDF
        pdf.save(`${data.title}.pdf`);

        // Clean up
        document.body.removeChild(container);

        toast(<span>PDF сгенерирован успешно</span>, {
          description: "Ваш PDF был скачан.",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast.error("Ошибка создания PDF", {
          description:
            "Произошла ошибка при создании вашего PDF. Пожалуйста, попробуйте еще раз.",
          duration: 5000,
        });
      } finally {
        setIsConverting(false);
      }
    }, 100); // Small delay to allow UI update
  }, [technicalSpecification, isConverting]);

  return (
    <DropdownMenuItem onClick={convertToPdf}>Скачать в PDF</DropdownMenuItem>
  );
};
