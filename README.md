# Carousel Component for Slice Company

## Overview

This project implements a Carousel Component designed for Slice Company, which specializes in managing equity grants for employees globally, in compliance with local tax regulations. The Carousel Component is a pivotal part of a larger system aimed at showcasing grant documents for various stakeholders.

### Key Features

- **Navigation Functionality**: Users can navigate through different grant documents efficiently.
- **Filtering by Tax Rules**: The component allows filtering of grants according to the tax rules applicable in different countries.
- **Display Information**: It displays the count of grants under each set of tax rules, alongside the stakeholders associated with those grants.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your computer.

### Installation

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/Omerrg/grant-documents-carousel.git
    ```

2. Navigate to the project directory:

    ```
    cd grant-documents-carousel
    ```

3. Install the necessary packages:

    ```
    npm install
    ```

### Running the Project

- To start the development server:

    ```
    npm start
    ```

    This script runs the command `npm run dev`, which starts the Vite development server.

- To run the project in production mode:

    ```
    npm run start:prod
    ```

    This script first builds the project by running `npm run build` and then previews the production build with `npm run preview`.

## Usage

The Carousel Component can be navigated using the arrows for moving through documents. Filters can be applied to sort documents based on the tax rules of different countries. Information regarding the number of grants and relevant stakeholders is displayed prominently.
