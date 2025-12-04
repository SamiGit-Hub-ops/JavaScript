	# SplitWise Web App
		A class-based, clean-architecture implementation of the core Splitwise functionality: creating groups, adding expenses, and settling balances.
		Table of Contents
			Overview
			Architecture
			Models
			Services
			UI Layer
			Helpers & Utilities
			Getting Started
			Contributing

	# Overview
	This project implements a single-page web application (SPA) that manages shared expenses using a clear, maintainable software architecture. We prioritize separation of concerns, ensuring that data logic (Models), business logic (Services), and presentation logic (UI) remain distinct and decoupled.

	# Architecture
	The application is structured into four primary layers, following a modular, class-based design pattern.

	# Models
	The Models directory contains simple classes responsible for defining the data structures used throughout the application. They are pure data containers and contain no business logic.

	# Services
	The Services layer encapsulates all the business logic, state management, and calculations. Services interact with Models to perform operations, but they are agnostic to how the data is displayed or persisted

	# UI Layer
	The UI Layer is responsible for rendering the application and handling user interactions. It uses a series of dedicated classes to manage different parts of the DOM. These classes subscribe to state changes within the Services layer

	# Helpers & Utilities
	This section contains utility classes and pure functions that assist other layers but do not belong to the core business domain.
