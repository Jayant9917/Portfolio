'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Mail, ArrowRight } from "lucide-react";

interface ResumeCardsProps {
  resumeUrl: string;
  coverLetterUrl: string;
}

export function ResumeCards({ resumeUrl, coverLetterUrl }: ResumeCardsProps) {
  // Function to handle download with Google Drive link
  const handleDownload = (url: string, filename: string) => {
    // For Google Drive links, we need to modify the URL for direct download
    const fileId = url.match(/[\w\-]{20,}/)?.[0];
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle view online (opens in new tab)
  const handleViewOnline = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {/* Resume Card */}
      <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg">Resume</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Download my professional resume to learn more about my experience, skills, and achievements.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => handleDownload(resumeUrl, 'Jayant_Pratap_Singh_Resume.pdf')}
              className="gap-1.5 text-xs h-8 px-3 bg-primary text-white hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80"
            >
              <Download className="w-3.5 h-3.5" />
              Download Resume
            </Button>
            <Button 
              variant="outline" 
              className="gap-1.5 text-xs h-8 px-3"
              onClick={() => handleViewOnline(resumeUrl)}
            >
              View Online
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cover Letter Card - Hidden if no URL provided */}
      {coverLetterUrl !== '#' && (
        <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Cover Letter</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Read my personalized cover letter to understand how I can contribute to your team.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="gap-1.5 text-xs h-8 px-3 border-green-200 text-primary hover:bg-green-50 dark:border-primary dark:text-white dark:hover:bg-primary/80"
                onClick={() => handleDownload(coverLetterUrl, 'Jayant_Pratap_Singh_Cover_Letter.pdf')}
              >
                <Download className="w-3.5 h-3.5" />
                Download Cover Letter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
