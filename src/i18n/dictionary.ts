import { en } from "./en";
import type { Locale } from "./locales";
import { vi } from "./vi";

/**
 * The Vietnamese dictionary defines the shape. `en.ts` is annotated with this
 * type, so a missing key fails as a missing property and an extra key fails as
 * an excess property: the two key sets cannot drift apart.
 */
export type Dictionary = typeof vi;

const dictionaries: Record<Locale, Dictionary> = { vi, en };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
