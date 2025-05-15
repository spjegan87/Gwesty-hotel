import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import HotelListing from "@/pages/HotelListing";
import HotelDetail from "@/pages/HotelDetail";
import BookingConfirmation from "@/pages/BookingConfirmation";
import BookingHistory from "@/pages/BookingHistory";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Newsletter } from "@/components/shared/Newsletter";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/hotels" component={HotelListing} />
          <Route path="/hotels/:id" component={HotelDetail} />
          <Route path="/booking/confirm" component={BookingConfirmation} />
          <Route path="/my-bookings" component={BookingHistory} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogDetail} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
