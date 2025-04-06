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
        // Fetch all CSS files
        const cssFiles = [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/index-U1fUriLbAM7MIc6zxUDXtiRdsjyxdH.css", // index
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zoom-1tp6GIT7V8YJYMEx5bWndBOd2QVcpf.css", // zoom
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/code-8mfoC0Qg6ACFHS4HNuTIZwdBIsQ7pK.css", // code
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/typography-T7dEBeGLtGJCXiq2u239ZsSQ6Xn8gA.css", // typography
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lists-vGMJSE1gyIygTMK9b2hkxavGQD7ghh.css", // lists
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-CcvHKVJ1jQDFOUzsO0EOB0pbSinZpx.css", // placeholder
        ];

        const responses = await Promise.all(cssFiles.map((url) => fetch(url)));
        const cssTexts = await Promise.all(responses.map((res) => res.text()));

        // Process and combine CSS
        let combinedCss = cssTexts.join("\n");

        // Remove @reference directives
        combinedCss = combinedCss.replace(/@reference[^;]*;/g, "");

        // Replace @import with actual content (already fetched)
        combinedCss = combinedCss.replace(/@import[^;]*;/g, "");

        // Process Tailwind @apply directives with basic equivalents
        // This is a simplified approach - in a real app you might need more sophisticated processing
        combinedCss = combinedCss.replace(/@apply([^;]*);/g, (match, props) => {
          // Convert Tailwind classes to basic CSS
          // This is very simplified and won't handle all cases
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
    if (!technicalSpecification) return;

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
  }, [technicalSpecification]);

  return (
    <DropdownMenuItem onClick={convertToPdf}>Скачать в PDF</DropdownMenuItem>
  );
};
