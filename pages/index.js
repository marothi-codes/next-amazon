import Head from 'next/head';
import Image from 'next/image';

// Component Imports.
import Layout from '../components/Layout';

function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          <li>Product 3</li>
        </ul>
      </div>
    </Layout>
  );
}

export default Home;
