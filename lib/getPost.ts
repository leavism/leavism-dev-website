import fs from 'fs';
import matter from 'gray-matter';
import { type Post } from 'interfaces';
import { join } from "path";

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[]): Post {
	const cleanSlug: string = slug.replace(/\.md$/, '');
	const fullPath: string = join(postsDirectory, `${cleanSlug}.md`);
	const fileContents: string = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents)
	const items: Post = {}

	// Makes sure only the minimal needed data is exposed
	fields.forEach((field) => {
		if (field === 'slug') {
			items[field] = cleanSlug
		}
		if (field === 'content') {
			items[field] = content
		}
		if (typeof data[field] !== 'undefined') {
			items[field] = data[field]
		}
	})

	return items;
}

export function getAllPosts(fields: string[] = []): Post[] {
	const slugs: string[] = getPostSlugs();
	const posts: Post[] = slugs
		.map((slug) => getPostBySlug(slug, fields))
		// TODO: Date property is possible undefined
		.sort((post1, post2) => (post1.date! > post2.date! ? -1 : 1))
	return posts;
}