import { useRef, forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import type { CardTemplate, StudentData } from '../types';

interface IDCardPreviewProps {
  studentData: StudentData;
  template: CardTemplate;
}

export default function IDCardPreview({ studentData, template }: IDCardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, { quality: 1 });
      const link = document.createElement('a');
      link.download = `${studentData.name}-ID-Card.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error downloading ID card:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">ID Card Preview</h2>
        <button
          onClick={handleDownload}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Download as PNG
        </button>
      </div>

      <div ref={cardRef}>
        {template === 'standard' ? (
          <StandardTemplate studentData={studentData} />
        ) : (
          <PremiumTemplate studentData={studentData} />
        )}
      </div>
    </div>
  );
}

const StandardTemplate = ({ studentData }: { studentData: StudentData }) => {
  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
      style={{ width: '340px', height: '215px' }}
    >
      <div className="flex h-full flex-col">
        <div className="bg-indigo-600 px-4 py-2 text-white">
          <h3 className="text-lg font-bold">UNITY SCHOOL</h3>
          <p className="text-xs">Student Identification Card</p>
        </div>

        <div className="flex flex-1 p-4">
          <div className="mr-4 flex flex-col items-center">
            {studentData.photo ? (
              <img
                src={studentData.photo}
                alt={studentData.name}
                className="h-24 w-24 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center bg-gray-200 text-gray-500">
                No Photo
              </div>
            )}

            <div className="mt-2">
              <QRCodeSVG
                value={JSON.stringify(studentData)}
                size={64}
                level="L"
              />
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-base font-bold">{studentData.name}</h4>
            <div className="mt-1 space-y-1 text-xs">
              <p>
                <span className="font-semibold">Roll No:</span> {studentData.rollNumber}
              </p>
              <p>
                <span className="font-semibold">Class:</span> {studentData.classDivision.class}-
                {studentData.classDivision.division}
              </p>
              <p>
                <span className="font-semibold">Rack No:</span> {studentData.rackNumber}
              </p>
              <p>
                <span className="font-semibold">Bus Route:</span> {studentData.busRoute.number}
              </p>

              {studentData.allergies.length > 0 && (
                <div>
                  <span className="font-semibold">Allergies:</span>{' '}
                  <span className="text-red-600">
                    {studentData.allergies.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumTemplate = ({ studentData }: { studentData: StudentData }) => {
  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md"
      style={{ width: '340px', height: '215px' }}
    >
      <div className="flex h-full flex-col">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-3 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-wider">UNITY SCHOOL</h3>
              <p className="text-xs italic opacity-80">Excellence in Education</p>
            </div>
            <div className="rounded-full bg-white p-1">
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold">
                  {studentData.classDivision.class}-{studentData.classDivision.division}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 gap-3 p-3">
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg border-2 border-indigo-600 shadow-md">
              {studentData.photo ? (
                <img
                  src={studentData.photo}
                  alt={studentData.name}
                  className="h-24 w-24 object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center bg-gray-200 text-gray-500">
                  No Photo
                </div>
              )}
            </div>

            <div className="mt-2 rounded border border-gray-200 bg-white p-1">
              <QRCodeSVG
                value={JSON.stringify(studentData)}
                size={64}
                level="L"
                includeMargin={false}
              />
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-base font-bold text-indigo-800">{studentData.name}</h4>
            <div className="mt-2 space-y-1 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-gray-600">Roll Number</span>
                <span>{studentData.rollNumber}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-gray-600">Rack Number</span>
                <span>{studentData.rackNumber}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="font-semibold text-gray-600">Bus Route</span>
                <span>{studentData.busRoute.number} ({studentData.busRoute.description})</span>
              </div>

              {studentData.allergies.length > 0 && (
                <div className="rounded-md bg-red-50 p-1 text-center">
                  <span className="font-semibold text-red-600">
                    Allergies: {studentData.allergies.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
