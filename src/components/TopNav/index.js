// Node modules.
import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
// Relative imports.
import Burger from "../icons/Burger"
import logo from "../../images/logo.svg"
import { Header, NavItems } from "./styles"

const isBrowser = typeof window !== "undefined"

const TopNav = ({ siteTitle }) => {
  const [showNavItems, setShowNavItems] = useState(false)

  const queryResult = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          navItems {
            label
            link
          }
        }
      }
    }
  `)

  const onNavItemClick = () => {
    setShowNavItems(false)
  }

  return (
    <>
      {/* Main Nav */}
      <Header>
        {/* Logo */}
        <Link to="/">
          <img alt="logo" src={logo} />
        </Link>

        {/* Title */}
        <Link to="/">
          <h1>{siteTitle}</h1>
        </Link>

        {/* Burger */}
        <button
          aria-label="burger icon for navigation"
          className={showNavItems ? "expanded" : ""}
          onClick={() => setShowNavItems(!showNavItems)}
          type="button"
        >
          <Burger highlighted={showNavItems} />
        </button>
      </Header>

      {/* Nav Items */}
      <NavItems className={showNavItems ? "expanded" : ""}>
        {queryResult?.site?.siteMetadata?.navItems?.map(navItem => (
          <Link
            className={
              isBrowser && navItem?.link === window.location.pathname
                ? "active"
                : ""
            }
            key={navItem?.link}
            to={navItem?.link}
            onClick={onNavItemClick}
          >
            <li>{navItem?.label}</li>
          </Link>
        ))}
      </NavItems>
    </>
  )
}

TopNav.propTypes = {
  siteTitle: PropTypes.string.isRequired,
}

export default TopNav
