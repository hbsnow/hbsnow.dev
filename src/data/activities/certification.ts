import type { Activity } from ".";

/**
 * AWS
 *
 * https://www.credly.com/users/hbsnow
 */
const aws: Activity[] = [
  {
    title: "2024 Japan AWS All Certifications Engineers 受賞",
    date: "2024-06-20",
    url: "https://aws.amazon.com/jp/blogs/psa/2024-japan-aws-all-certifications-engineers/",
  },
  {
    title: "2023 Japan AWS All Certifications Engineers 受賞",
    date: "2023-04-20",
    url: "https://aws.amazon.com/jp/blogs/psa/2023-japan-aws-all-certifications-engineers/",
  },
  {
    title: "AWS Certified: SAP on AWS – Specialty",
    date: "2023-02-09",
    url: "https://www.credly.com/badges/c2b61f27-f629-42e8-a072-404bb3fe7751/public_url",
  },
  {
    title: "AWS Certified Advanced Networking – Specialty",
    date: "2023-01-17",
    url: "https://www.credly.com/badges/1510639a-6d29-4d2f-b6e6-6b73b1ea0a43/public_url",
  },
  {
    title: "AWS Certified Machine Learning – Specialty",
    date: "2022-08-15",
    url: "https://www.credly.com/badges/9d2bcb35-b1f8-48df-821c-9c5c1c78110a/public_url",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    date: "2022-08-03",
    url: "https://www.credly.com/badges/d21eca75-f6aa-4b41-8120-130e76f5806f/public_url",
  },
  {
    title: "AWS Certified Data Analytics – Specialty",
    date: "2022-08-01",
    url: "https://www.credly.com/badges/af02affc-31d9-44cb-a9b6-54e943976cb7/public_url",
  },
  {
    title: "AWS Certified Database – Specialty",
    date: "2022-07-19",
    url: "https://www.credly.com/badges/40c3df93-bdd9-492a-86b6-7104da45b2fb/public_url",
  },
  {
    title: "AWS Certified Security – Specialty",
    date: "2022-07-04",
    url: "https://www.credly.com/badges/a1814027-7aa3-4e88-bf3c-941d9f08af48/public_url",
  },
  {
    title: "AWS Certified Solutions Architect – Professional",
    date: "2022-06-27",
    url: "https://www.credly.com/badges/c5a99c9c-d9f3-4de8-b4a5-2123647dca95/public_url",
  },
  {
    title: "AWS Certified DevOps Engineer – Professional",
    date: "2022-05-30",
    url: "https://www.credly.com/badges/c72d8efb-5bee-4fce-912b-15dfb05e68a4/public_url",
  },
  {
    title: "AWS Certified Developer – Associate",
    date: "2021-04-30",
    url: "https://www.credly.com/badges/e7678cba-bd52-4b8b-94ae-a70d327f23bd/public_url",
  },
  {
    title: "AWS Certified SysOps Administrator – Associate",
    date: "2021-04-20",
    url: "https://www.credly.com/badges/3a4f4895-234b-42d7-b1d2-11ac6c081544/public_url",
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    date: "2021-04-06",
    url: "https://www.credly.com/badges/3df90b26-db49-4187-af50-fa180e8342a8/public_url",
  },
].map((v) => ({ type: "certification", category: "aws", ...v }));

/**
 * Google Cloud
 *
 * https://www.credly.com/users/hbsnow/badges
 */
const googleCloud: Activity[] = [
  {
    title: "Professional Google Workspace Administrator Certification",
    date: "2024-06-12",
    url: "https://www.credly.com/badges/c6a035e5-2cb3-4eee-b525-c0d1380ebbc0/public_url",
  },
  {
    title: "Professional Google Cloud Cloud Network Engineer",
    date: "2024-05-15",
    url: "https://www.credly.com/badges/ecbb9b7c-56b5-4ae5-b1e7-8b3f9d471b34/public_url",
  },
  {
    title: "Professional Google Cloud Cloud Security Engineer",
    date: "2024-04-17",
    url: "https://www.credly.com/badges/23876f61-9470-4766-a18b-d4a5a5a2a6c6/public_url",
  },
  {
    title: "Professional Google Cloud Cloud DevOps Engineer",
    date: "2024-03-15",
    url: "https://www.credly.com/badges/12dda099-b195-4d79-a77e-2d40a6c7847b/public_url",
  },
  {
    title: "Professional Google Cloud Data Engineer",
    date: "2023-08-18",
    url: "https://www.credly.com/badges/2b75d0ee-7cf5-4824-8421-dfb1521cd589/public_url",
  },
  {
    title: "Professional Google Cloud Developer",
    date: "2023-06-30",
    url: "https://www.credly.com/badges/f5c609eb-9716-4bad-94a1-e2a24e669279/public_url",
  },
  {
    title: "Professional Google Cloud Architect",
    date: "2022-10-06",
    url: "https://www.credly.com/badges/4d6d6740-752c-414e-be7d-331350730a95/public_url",
  },
  {
    title: "Associate Cloud Engineer",
    date: "2022-09-20",
    url: "https://www.credly.com/badges/631ddfa5-331d-471d-9e1e-30bfd9621074/public_url",
  },
  {
    title: "Cloud Digital Leader",
    date: "2022-09-02",
    url: "https://www.credly.com/badges/618d8ecd-054b-4a84-9d8a-60eb61c4a8d4/public_url",
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
