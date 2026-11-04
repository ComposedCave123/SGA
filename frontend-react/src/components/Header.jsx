import { AppBar, Box, Container, IconButton, Link, Stack, Toolbar, Typography } from "@mui/material"
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded"
import { Link as RouterLink } from "react-router-dom"
import SelectorTema from "./SelectorTema"

export default function Header() {
    return (
        <AppBar
            component="header"
            position="static"
            color="transparent"
            elevation={0}
            sx={{
                bgcolor: "background.paper",
                borderBottom: 1,
                borderColor: "divider"
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: { xs: 76, sm: 88 },
                        py: { xs: 1, sm: 1.5 },
                        gap: { xs: 1.5, sm: 3 },
                        flexWrap: "wrap",
                        justifyContent: "space-between"
                    }}
                >
                    <Link
                        component={RouterLink}
                        to="/"
                        aria-label="SGA, ir al inicio"
                        underline="none"
                        sx={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
                    >
                        <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                            <Box
                                component="img"
                                src="/sga-logo.svg"
                                alt="Identidad visual de SGA"
                                sx={{
                                    display: "block",
                                    width: { xs: 42, sm: 50 },
                                    height: { xs: 42, sm: 50 },
                                    objectFit: "contain"
                                }}
                            />
                            <Box>
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                                    SGA
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Gestión Académica
                                </Typography>
                            </Box>
                        </Stack>
                    </Link>

                    <Stack
                        component="nav"
                        aria-label="Navegación principal"
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: { xs: 0.5, sm: 1.5 },
                            flexWrap: "wrap",
                            flex: { xs: "1 1 100%", sm: "0 1 auto" },
                            order: { xs: 2, sm: 0 }
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to="/"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Inicio
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/alumnos"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Alumnos
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/docentes"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Docentes
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/materias"
                            color="text.primary"
                            underline="none"
                            sx={{ px: { xs: 1, sm: 1.5 }, py: 1, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
                        >
                            Materias
                        </Link>
                        <IconButton
                            component={RouterLink}
                            to="/ayuda"
                            aria-label="Ayuda"
                            color="primary"
                            sx={{ mx: 0.25 }}
                        >
                            <HelpOutlineRoundedIcon />
                        </IconButton>
                        <SelectorTema />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
