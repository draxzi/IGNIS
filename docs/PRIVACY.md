# IGNIS Privacy and Data Flow

**Last reviewed:** November 2026

IGNIS is a portable research demonstration. The application source does not add analytics, advertising trackers, cookies, local-storage persistence, session-storage persistence, accounts, or a project database.

## CSV files

The Data Laboratory reads the selected CSV with the browser File API. The current application parses the file in the browser, keeps the parsed rows in the current page session, and does not send the CSV to the IGNIS server or to NASA. The application does not provide a promise that a hosting provider, browser, proxy, or operating system keeps no logs; those services may have their own operational logging outside this application’s source code.

The current interface does not persist an uploaded file after the page is closed or refreshed. Users should still avoid uploading confidential, personal, regulated, or mission-sensitive data to a demonstration application.

## Assistant requests

Without `AI_API_KEY`, Assistant requests use the deterministic local fallback and do not call an external AI provider. If an operator configures `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL`, the server sends the user’s question and matched public IGNIS source context to that configured OpenAI-compatible endpoint. The browser never receives the API key. The configured provider’s privacy policy, retention, residency, and terms apply to those requests.

The application does not send uploaded CSV contents to the Assistant route. The Assistant route accepts a bounded question only and limits it to 600 characters.

## External links

Research links point to NASA Glenn Research Center, NASA Physical Sciences Informatics, or NASA Technical Reports Server pages. Opening an external link transfers the request to that destination under its own policies.

## Changes and contact

This document describes the current source behavior and is not a legal privacy notice for a specific hosting provider. Operators deploying IGNIS should update this document with their hosting, logging, contact, retention, and jurisdiction details before public use. No contact address is invented here because the recovered project does not define an operator or service owner.
