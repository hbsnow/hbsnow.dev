import type { Activity } from ".";

/**
 * AWS
 *
 * https://www.credly.com/users/hbsnow
 */
const aws: Activity[] = [
  {
    title: "2023 Japan AWS All Certifications Engineers 受賞",
    date: "2023-04-20",
    url: "https://aws.amazon.com/jp/blogs/psa/2023-japan-aws-all-certifications-engineers/",
  },
  {
    title: "AWS Certified: SAP on AWS – Specialty",
    date: "2023-02-09",
    url: "https://www.credly.com/badges/c2b61f27-f629-42e8-a072-404bb3fe7751",
  },
  {
    title: "AWS Certified Advanced Networking – Specialty",
    date: "2023-01-17",
    url: "https://www.credly.com/badges/1510639a-6d29-4d2f-b6e6-6b73b1ea0a43",
  },
  {
    title: "AWS Certified Machine Learning – Specialty",
    date: "2022-08-15",
    url: "https://www.credly.com/badges/9d2bcb35-b1f8-48df-821c-9c5c1c78110a",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    date: "2022-08-03",
    url: "https://www.credly.com/badges/d21eca75-f6aa-4b41-8120-130e76f5806f",
  },
  {
    title: "AWS Certified Data Analytics – Specialty",
    date: "2022-08-01",
    url: "https://www.credly.com/badges/af02affc-31d9-44cb-a9b6-54e943976cb7",
  },
  {
    title: "AWS Certified Database – Specialty",
    date: "2022-07-19",
    url: "https://www.credly.com/badges/40c3df93-bdd9-492a-86b6-7104da45b2fb",
  },
  {
    title: "AWS Certified Security – Specialty",
    date: "2022-07-04",
    url: "https://www.credly.com/badges/a1814027-7aa3-4e88-bf3c-941d9f08af48",
  },
  {
    title: "AWS Certified Solutions Architect – Professional",
    date: "2022-06-27",
    url: "https://www.credly.com/badges/c5a99c9c-d9f3-4de8-b4a5-2123647dca95",
  },
  {
    title: "AWS Certified DevOps Engineer – Professional",
    date: "2022-05-30",
    url: "https://www.credly.com/badges/c72d8efb-5bee-4fce-912b-15dfb05e68a4",
  },
  {
    title: "AWS Certified Developer – Associate",
    date: "2021-04-30",
    url: "https://www.credly.com/badges/e7678cba-bd52-4b8b-94ae-a70d327f23bd",
  },
  {
    title: "AWS Certified SysOps Administrator – Associate",
    date: "2021-04-20",
    url: "https://www.credly.com/badges/3a4f4895-234b-42d7-b1d2-11ac6c081544",
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    date: "2021-04-06",
    url: "https://www.credly.com/badges/3df90b26-db49-4187-af50-fa180e8342a8",
  },
].map((v) => ({ type: "certification", category: "aws", ...v }));

/**
 * Google Cloud
 *
 * https://www.credential.net/profile/hbsnow
 */
const googleCloud: Activity[] = [
  {
    title: "Google Cloud Professional Cloud Developer",
    date: "2023-06-30",
    url: "https://www.credential.net/e98a60d0-6c19-48e9-83b6-7c79d167d7cd",
  },
  {
    title: "Google Cloud Professional Cloud Architect",
    date: "2022-10-06",
    url: "https://www.credential.net/4f641ec8-d9c2-4bb7-afc1-155ac3826595",
  },
  {
    title: "Google Cloud Associate Cloud Engineer",
    date: "2022-09-20",
    url: "https://www.credential.net/0efd47c6-1362-47c8-a757-baf30cdb2790",
  },
  {
    title: "Google Cloud Certified Cloud Digital Leader",
    date: "2022-09-02",
    url: "https://www.credential.net/7e9238ee-9ebe-492a-bddf-7a7b509d618d",
  },
].map((v) => ({ type: "certification", category: "google-cloud", ...v }));

/**
 * Line
 *
 * https://campus.line.biz/mypage/certificates/
 */
const line: Activity[] = [
  {
    title: "LINE公式アカウント Basic",
    date: "2023-01-21",
  },
  {
    title: "LINE公式アカウント Advanced",
    date: "2023-01-31",
  },
].map((v) => ({ type: "certification", category: "line", ...v }));

export const certification: Activity[] = [...aws, ...googleCloud, ...line];
