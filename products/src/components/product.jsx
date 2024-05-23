import React from "react"; 

export default function Product() {

  const handleBaseball = () => {
    window.location.href = 'https://legendsportspro.com/baseball/';
  }
  const handleSoftball = () => {
    window.location.href = 'https://legendsportspro.com/softball/';
  }
  const handleElbowGuard = () => {
     window.location.href = 'https://legendsportspro.com/elbow-guard/';
  }

   return(
    <main id="main">
    {/* Product Block */}
    <div className="hb-fielders-glove">
      <div className="container">
        <div className="heading">
          <h2>Glove Builder</h2>
        </div>
        <div className="d-flex flex-wrap justify-content-center text-center">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="hb-content bg-white ">
              <div className="hb-content-header">
                <div className="d-flex justify-content-center">
                  <div className="col-heading-content">
                    <div className="upper-heading-content">
                      <h3>Baseball</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-box my-3">
              <img src={`/wp-content/reactpress/apps/products/build/images/fielder.png`} className="mx-auto" alt="layer-45" />
              </div>
              <div className="btn-box text-center">
                <button onClick={handleBaseball} className="btn" >Select</button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="hb-content bg-white ">
              <div className="hb-content-header">
                <div className="d-flex justify-content-center">
                  <div className="col-heading-content black">
                    <div className="upper-heading-content black">
                      <h3>Softball</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-box my-3">
              <img src={`/wp-content/reactpress/apps/products/build/images/fielder.png`} className="mx-auto" alt="layer-45" />
              </div>
              <div className="btn-box text-center">
                <button onClick={handleSoftball} className="btn">Select</button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="hb-content bg-white ">
              <div className="hb-content-header">
                <div className="d-flex justify-content-center">
                  <div className="col-heading-content">
                    <div className="upper-heading-content">
                      <h3>Elbow Guard</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image-box my-3">
              <img src={`/wp-content/reactpress/apps/products/build/images/elbowguard.png`} className="mx-auto" alt="layer-45" />
              </div>
              <div className="btn-box text-center">
                <button onClick={handleElbowGuard} className="btn">Select</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
   )
}