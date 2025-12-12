function Home() {
  return (
    <div>
      <h1>Welcome to the react code challenge</h1>

      <p>
        In this challenge, we are going to build a simple frontend application
        in React to display data from the Rick and Morty API (
        <a
          href="https://rickandmortyapi.com/documentation"
          target="_blank"
          rel="noreferrer"
        >
          https://rickandmortyapi.com/documentation
        </a>
        ).
      </p>

      <p>
        The Rick and Morty API exposes data via REST and can be called by any
        application.
      </p>

      <p>
        Your challenge is to create an application that can display ALL the data
        available in the API — with pages to list entries and pages to show
        single items.
      </p>

      <p>Don't worry about time, we know this challenge can take a while.</p>

      <p>
        We want to see how you break the problem into smaller parts and how far
        you can go.
      </p>

      <p>Here are some code snippets to speed up your development:</p>

      <p>
        <b>Get a list of characters:</b>
        <br />
        const response = await
        fetch("https://rickandmortyapi.com/api/character");
        <br />
        const result = await response.json();
      </p>

      <p>
        <b>Search characters (name contains “rick”):</b>
        <br />
        const response = await
        fetch("https://rickandmortyapi.com/api/character/?name=rick");
        <br />
        const result = await response.json();
      </p>

      <p>
        <b>Pagination (20 items per page):</b>
        <br />
        const response = await
        fetch("https://rickandmortyapi.com/api/character/?page=2");
        <br />
        const result = await response.json();
      </p>

      <p>
        <b>Get a single character by ID:</b>
        <br />
        const response = await
        fetch("https://rickandmortyapi.com/api/character/1");
        <br />
        const result = await response.json();
      </p>

      <p>
        <b>Filter characters (status + species):</b>
        <br />
        const response = await
        fetch("https://rickandmortyapi.com/api/character/?status=alive&species=human");
        <br />
        const result = await response.json();
      </p>

      <p>
        <b>Other resources:</b>
        <br />
        Episodes: https://rickandmortyapi.com/api/episode/
        <br />
        Locations: https://rickandmortyapi.com/api/location/
      </p>
    </div>
  );
}

export default Home;
