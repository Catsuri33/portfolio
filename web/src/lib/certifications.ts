import type { AssetPath } from '$app/types';

export type Certification = {
	title: string;
	issuer: string;
	kind: 'course' | 'certification';
	issued: string; // ISO date
	badge: AssetPath; // path under static/
	url: string; // public Credly URL
};

export const certifications: Certification[] = [
	{
		title: 'LFS158: Introduction to Kubernetes',
		issuer: 'The Linux Foundation',
		kind: 'course',
		issued: '2026-11-07',
		badge: 'badges/lfs158.png',
		url: 'https://www.credly.com/badges/18f1b8be-b5f3-4262-addb-87a09d40aa32/public_url'
	},
	{
		title: 'LFEL1009: Getting Started with OpenTofu',
		issuer: 'The Linux Foundation',
		kind: 'course',
		issued: '2026-07-12',
		badge: 'badges/lfel1009.png',
		url: 'https://www.credly.com/badges/63ec1800-5de9-4d4f-9b12-d0cd69621d1c/public_url'
	}
];
