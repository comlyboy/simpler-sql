import axios from "axios";
import jsPDF from "jspdf";
import knex, { Knex } from "knex";

export interface IBaseNamesContacts {
	name: string;
	firstName: string;
	lastName: string;
	email: string;
	emailIsVerified: boolean;
	emailVerifiedAtDate?: string;
	phoneNumber?: string;
	phoneNumberIsVerified?: boolean;
	phoneNumberVerifiedAtDate?: string;
}

export class SampleClass {
	name: string;
	firstName: string;
	lastName: string;
	email: string;
	profile: IBaseNamesContacts;
	emailIsVerified: boolean;
	emailVerifiedAtDate?: string;
	phoneNumber?: string;
	phoneNumberIsVerified?: boolean;
	phoneNumberVerifiedAtDate?: string;
}

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN
});

// export class PostgresSqlBulder {
// 	private readonly sqlBuilder = knex({ client: 'pg' });

// 	query() {
// 		const createQueryKnex = this.sqlBuilder('user').insert({ name: 'Jane Doe' }).toString();
// 		// const sqlUpdateQuery = this.sqlBuilder('user').where('id', 1).update({ name: 'Jane Doe' }).toString();
// 		// const sqlQuery2 = this.sqlBuilder('users').select().where('id', 1).toString();


// 		console.log('createQueryKnex =', createQueryKnex);

// 	}

// }


// try {



// } catch (error) {
// 	console.log('error =>', error.message);
// }



export function sqlBuilder<TEntitySchema extends Record<string, any>>(tableName: string) {
	if (!tableName.trim()) throw new Error('Table name is needed!');
	return knex<{ [k in keyof TEntitySchema as Lowercase<keyof TEntitySchema & string>]: TEntitySchema[k] }, TEntitySchema>({
		client: 'pg',
		connection: false as any,
		pool: { min: 0, max: 0 }
	})(tableName);
}


// export function sqlBuilder2<TEntitySchema extends Record<string, any>>(tableName: string) {
// 	if (!tableName.trim()) throw new Error('Table name is needed!');
// 	return knex<Record<Lowercase<keyof TEntitySchema & string>, string | number | boolean | Record<string, any>>, TEntitySchema>({ client: 'pg' })(tableName);
// }

const createQueryKnex = sqlBuilder<SampleClass>('user').insert({ firstname: 'corne' }).toQuery();
const sqlUpdateQuery2 = sqlBuilder('user').where('id', 1).update({ name: 'remote gravity' }).toString();
const sqlQuery = sqlBuilder('user').select('').where({ name: 'rjehfkdw', phonenumber: '090567654509' }).toString();
const deleteQuery = sqlBuilder<SampleClass>('user').where({ name: 'rjehfkdw', phonenumber: '09056765459' }).delete().toString();
const deleteQuery2 = sqlBuilder<SampleClass>('user').where({}).delete().toString();

// sqlBuilder<SampleClass>('users')
// 	.select('firstName', 'name', 'lastname')
// 	.where('id', '123456789')
// 	// .innerJoin('order', 'order.userid', 'users.id')
// 	.innerJoin('payments', 'payments.orderId', 'order.id').limit(1).then(d => console.log(d)).catch(error => console.log(error));

sqlBuilder<SampleClass>('users').delete().where('', '')

// console.log('createQuezryKnex =', createQueryKnex);
// console.log('sqlUpdateQuery2 =', sqlUpdateQuery2);
// console.log('deleteQuery =', deleteQuery);
// console.log('deleteQuery2 =', deleteQuery2);
// console.log('select JOIN =>>>', selectJoin);

export async function generatePDFfromURL(url: string, outputPath: string) {
	try {
		const response = await axios.get(url);
		const textContent = response.data;
		const doc = new jsPDF();
		doc.text(textContent, 10, 10);
		doc.save(outputPath);
		console.log('PDF generated successfully');
	} catch (error) {
		console.error('Error fetching URL:', error);
	}
}

// Usage
// generatePDFfromURL('https://google.com', 'google.pdf');



// Define the interface with camelCase keys
interface IUser {
	firstName: string;
	lastName: string;
	age: number;
	address: {
		cityName: string;
		zipCode: string;
	};
}

// Utility function to convert lowercase keys back to camelCase using the interface
export function toCamelCaseProperties<T>(obj: any, ref: T): T {
	if (typeof obj !== 'object' || obj === null) {
		return obj; // Return non-object types as is
	}

	return Object.entries(obj).reduce((acc: any, [key, value]) => {
		// Find the matching camelCase key in the reference object
		const camelKey = Object.keys(ref).find(k => k.toLowerCase() === key) || key;

		// Recursively process nested objects using the matching reference type
		acc[camelKey as keyof T] = typeof value === 'object' && value !== null
			? toCamelCaseProperties(value, ref[camelKey as keyof T])
			: value;

		return acc;
	}, {} as T);
}

// Example usage:
const lowerCaseObj = {
	firstname: 'John',
	lastname: 'Doe',
	age: 30,
	address: {
		cityname: 'New York',
		zipcode: '10001'
	}
};

// Use the interface definition to guide the conversion
// const camelCaseObj = toCamelCaseProperties(lowerCaseObj, {} as User);

// console.log(camelCaseObj);

// function createDefaultObject<T>(type: new () => T): T {
// 	return d.create(type);
// }

// async function countCommits() {
// 	const username = "username";
// 	const targetDate = "2025-09-17";
// 	const since = new Date(`${targetDate}T00:00:00Z`).toISOString();
// 	const until = new Date(`${targetDate}T23:59:59Z`).toISOString();

// 	const repos = await octokit.repos.listForUser({ username, per_page: 100 });

// 	let totalCommits = 0;

// 	for (const repo of repos.data) {
// 		const commits = await octokit.repos.listCommits({
// 			owner: username,
// 			repo: repo.name,
// 			since,
// 			until,
// 		});

// 		const count = commits.data.length;
// 		totalCommits += count;

// 		console.log(`${repo.name}: ${count} commits on ${targetDate}`);
// 	}

// 	console.log(`\nTOTAL COMMITS on ${targetDate}:=>  ${totalCommits}`);
// }

// run().catch(console.error);
